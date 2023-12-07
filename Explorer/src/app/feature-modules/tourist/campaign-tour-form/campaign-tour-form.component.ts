import { Component, Input, OnInit } from '@angular/core';
import { Status, Tour, TourDifficulty, TransportType } from '../../tour-authoring/model/tour.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { RouteInfo } from 'src/app/shared/model/routeInfo.model';
import { Equipment } from '../../administration/model/equipment.model';
import { filter } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'xp-campaign-tour-form',
  templateUrl: './campaign-tour-form.component.html',
  styleUrls: ['./campaign-tour-form.component.css']
})
export class CampaignTourFormComponent implements OnInit {

  public newTour: Tour
  public tourForm: FormGroup
  public tourId: number | undefined
  public routeQuery: RouteQuery
  public routeInfo: RouteInfo
  public isLoading = true;
  public boughtTours: Tour[] = []
  public selectedTours: Tour[] = []
  public keypoints: Keypoint[] = []
  public equipment: Equipment[] = []
  public dummyArray: Equipment[] = []
  public complete : boolean = false
  public difficulty: TourDifficulty

  constructor(private tourAuthoringService: TourAuthoringService,private marketplaceService: MarketplaceService,public authService: AuthService ,private router: Router, private route: ActivatedRoute) {
    this.newTour = { description: '', difficulty: TourDifficulty.EASY, status: Status.DRAFT, name: '', price: 0, transportType: TransportType.WALK, userId: 0, id:0}
    
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      transportType: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params : ParamMap) => {
      this.tourId = Number(params.get('id'));

      if(this.tourId !== 0){
        this.tourAuthoringService.getTourById(this.tourId).subscribe((res: Tour) => {
          this.newTour = res;
          this.tourForm.patchValue(this.newTour);
          this.getTourKeypoints();
        });
      }else{
        this.loadPurchasedTours();
      }

    })
  }

  loadPurchasedTours() {
    this.marketplaceService.getPurchasedTours().subscribe(tokens => {
      tokens.results.forEach(token => {
        if (token.touristId === this.authService.user$.value.id) {
          this.addTourIfPurchased(token);
        }
      });
      this.isLoading = false;
    });
  }

  addTourIfPurchased(token: any): void {
    this.marketplaceService.getPublishedTours().subscribe(tours => {
      tours.results.forEach(tour => {
        if (token.tourId === tour.id) {
          this.boughtTours.push(tour);
        }
      });
    });
  }

  addTour(tour : Tour):void{
    if(this.selectedTours.some(t => t.id === tour.id)){
      alert('This tour has already been selected')
    }else{
    this.selectedTours.push(tour);
    }
  }

  removeTour(tour : Tour):void{
    this.selectedTours.splice(this.selectedTours.indexOf(tour));
  }

  async loadEquipment(): Promise<void> {
    for (const t of this.selectedTours) {
      const result = await this.tourAuthoringService.getEquipmentForTour(t.id as number).toPromise();
      result?.forEach(r => {
        this.dummyArray.push(r);
      });
    }
  }

  async setEquipment(): Promise<void> {
    this.equipment = this.dummyArray.filter((equipment, index, self) =>
      index === self.findIndex((e) => e.name === equipment.name)
    );
  }
  

  getTourKeypoints(): void{
    this.tourAuthoringService.getKeypointsByTour(this.tourId as number).subscribe(res => {
      this.newTour.keypoints = res.results;
      this.routeQuery = {
        keypoints: this.keypoints,
        transportType: this.newTour.transportType
      }
    });
  }

  async createKeypoints(){
    this.keypoints.forEach(k => {
        k.id = 0;
        k.tourId = this.newTour.id;
        this.tourAuthoringService.addKeypoint(k).subscribe({
          next: () => { 
            this.getTourKeypoints();
          }
        });
    });
  }

  async makeCampaign(){
    this.selectedTours.forEach(t =>{
      if(t.keypoints?.[0] !== undefined){
        this.keypoints?.push(t.keypoints?.[0]);
      }
      const lastKeypoint = t.keypoints?.[t.keypoints.length - 1];
      if(lastKeypoint !== undefined){
        this.keypoints?.push(lastKeypoint);
      }
    })
  }

  getRouteInfo(event : RouteInfo):void{
    if(this.newTour.duration !== event.duration || this.newTour.distance !== event.distance){
      this.newTour.duration = event.duration;
      this.newTour.distance = event.distance;

      this.tourAuthoringService.updateTour(this.newTour).subscribe({
        next: (updatedTour) => { 
          this.newTour = updatedTour;
        }
      });
     }
  }

  calculateCampaignDifficulty():number{
    let avg = 0;
    this.selectedTours.forEach(t => {
      if(t.difficulty === 'EXTREME'){
        avg += 3;
      }else if(t.difficulty === 'HARD'){
        avg += 2;
      }else if(t.difficulty === 'MEDIUM'){
        avg += 1;
      }else{
      }
    })

    return Math.ceil(avg/this.selectedTours.length);
  }

  async setCampaignDifficulty(){

    let difficulty = this.calculateCampaignDifficulty();

    if(difficulty === 0){
      this.difficulty = TourDifficulty.EASY;
    }else if(difficulty === 1){
      this.difficulty = TourDifficulty.MEDIUM;
    }else if(difficulty === 2){
      this.difficulty = TourDifficulty.HARD;
    }else{
      this.difficulty = TourDifficulty.EXTREME;
    }
  }

 async saveTour(){

    let newTour: Tour = {
      id: this.tourId,
      userId: -1,
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      price: 999,
      difficulty: this.tourForm.value.difficulty || "",
      transportType: this.tourForm.value.transportType || "",
      status: Status.CAMPAIGN,
      statusUpdateTime: new Date(),
      tags: []
    };

    if(this.tourId === 0){
      this.tourAuthoringService.addCampaignTour(newTour).subscribe({
        next: (newTour) => { 
          window.alert("You have successfuly saved your campaign tour");
          this.newTour = newTour;
          this.tourId = newTour.id as number;
        }
      });
    }else{

      if(this.selectedTours.length < 2){
        alert('Please select at least two tours for your campaign.');
        return;
      }
      await this.makeCampaign();
      await this.createKeypoints();
      await this.loadEquipment();
      await this.setEquipment();
      await this.setCampaignDifficulty();

      newTour.distance = Math.floor(this.newTour.distance as number);
      newTour.duration = this.newTour.duration;
      newTour.difficulty = this.difficulty;

      this.tourAuthoringService.updateTour(newTour).subscribe({
        next: (updatedTour) => { 
          window.alert("You have successfuly updated your tour");
          this.newTour = updatedTour;
          this.routeQuery = {
            keypoints: this.keypoints,
            transportType: this.newTour.transportType
          }
        }
      });

      this.complete = true;
    }
  }
}
