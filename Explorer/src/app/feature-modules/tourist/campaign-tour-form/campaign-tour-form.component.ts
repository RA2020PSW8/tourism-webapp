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
  public complete : boolean = false

  constructor(private tourAuthoringService: TourAuthoringService,private marketplaceService: MarketplaceService,public authService: AuthService ,private router: Router, private route: ActivatedRoute) {
    this.newTour = { description: '', difficulty: TourDifficulty.EASY, status: Status.DRAFT, name: '', price: 0, transportType: TransportType.WALK, userId: 0, id:0}
    
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      difficulty: new FormControl(''),
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
    this.selectedTours.push(tour);
  }

  removeTour(tour : Tour):void{
    this.selectedTours.splice(this.selectedTours.indexOf(tour));
  }

  loadEquipment():void{
    let dummyArray : Equipment[] = []
    this.selectedTours.forEach(t => {
      this.tourAuthoringService.getEquipmentForTour(t.id as number).subscribe((result) =>{
      dummyArray = dummyArray.concat(result);
      });
    })
    
    alert(dummyArray.length)

   dummyArray.forEach(e => {
      if(!this.equipment.includes(e)){
        this.equipment.push(e);
      }
    })
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

  createKeypoints(){
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

  makeCampaign():void{
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

  saveTour(): void {

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

      this.makeCampaign();
      this.createKeypoints();
      this.loadEquipment();
      newTour.distance = Math.floor(this.newTour.distance as number);
      newTour.duration = this.newTour.duration;
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
