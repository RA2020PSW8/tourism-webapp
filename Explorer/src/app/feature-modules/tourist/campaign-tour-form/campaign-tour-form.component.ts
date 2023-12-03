import { Component, Input, OnInit } from '@angular/core';
import { Status, Tour, TourDifficulty, TransportType } from '../../tour-authoring/model/tour.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-campaign-tour-form',
  templateUrl: './campaign-tour-form.component.html',
  styleUrls: ['./campaign-tour-form.component.css']
})
export class CampaignTourFormComponent implements OnInit {

  public newTour: Tour
  public tourForm: FormGroup
  public tourId: number
  public avaliableKeypoints: Keypoint[] = []
  public selectedKeypoints: Keypoint[] = []
  public routeQuery: RouteQuery
  public isLoading = true;
  public boughtTours: Tour[] = []

  constructor(private tourAuthoringService: TourAuthoringService,private marketplaceService: MarketplaceService,public authService: AuthService , private router: Router, private route: ActivatedRoute) {
    this.newTour = { description: '', difficulty: TourDifficulty.EASY, status: Status.DRAFT, name: '', price: 0, transportType: TransportType.WALK, userId: 0, id:0}
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      difficulty: new FormControl(''),
      transportType: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadPurchasedTours();
  }

  addKeypoint(keypoint : Keypoint):void{
    this.selectedKeypoints.push(keypoint);
  }

  removeKeypoint(keypoint : Keypoint):void{
    this.selectedKeypoints.splice(this.selectedKeypoints.indexOf(keypoint));
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
          this.avaliableKeypoints = this.avaliableKeypoints.concat(tour.keypoints || []);
        }
      });
    });
  }

  saveTour(statusChange: string = ''): void {
    let newTour: Tour = {
      id: -1,
      userId: -1,
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      price: 0,
      difficulty: this.tourForm.value.difficulty || "",
      transportType: this.tourForm.value.transportType || "",
      status: Status.CAMPAIGN,
      tags: [],
      keypoints: this.selectedKeypoints
    };

    if(this.tourId === 0){
      newTour.statusUpdateTime = new Date();
      this.tourAuthoringService.addCampaignTour(newTour).subscribe({
        next: (newTour) => { 
          window.alert("You have successfuly saved your campaign tour");
          this.router.navigate(
            ['/home']
          );
        }
      });
    }
  }
}
