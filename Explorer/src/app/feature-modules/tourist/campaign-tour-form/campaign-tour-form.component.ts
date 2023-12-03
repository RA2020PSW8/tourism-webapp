import { Component, Input, OnInit } from '@angular/core';
import { Status, Tour, TourDifficulty, TransportType } from '../../tour-authoring/model/tour.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'xp-campaign-tour-form',
  templateUrl: './campaign-tour-form.component.html',
  styleUrls: ['./campaign-tour-form.component.css']
})
export class CampaignTourFormComponent implements OnInit {
  public tour: Tour
  public tourForm: FormGroup
  public tourId: number
  public avaliableKeypoints: Keypoint[] = []
  public selectedKeypoints: Keypoint[] = []
  public routeQuery: RouteQuery

  @Input() boughtTours: Tour[] = []

  constructor(private tourAuthoringService: TourAuthoringService , private router: Router, private route: ActivatedRoute) {
    this.tour = { description: '', difficulty: TourDifficulty.EASY, status: Status.DRAFT, name: '', price: 0, transportType: TransportType.WALK, userId: 0, id:0}
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      difficulty: new FormControl(''),
      transportType: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAvaliableKeypoints();
  }

  getAvaliableKeypoints(){
    this.boughtTours.forEach(t =>{
        t.keypoints?.forEach(k => {
          this.avaliableKeypoints.push(k);
        })
    });
  }

  saveTour(statusChange: string = ''): void {
    let tour: Tour = {
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
      tour.statusUpdateTime = new Date();
      this.tourAuthoringService.addCampaignTour(tour).subscribe({
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
