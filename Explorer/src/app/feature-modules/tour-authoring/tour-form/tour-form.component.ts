import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Keypoint } from '../model/keypoint.model';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnChanges, OnInit{  
  
  public tour: Tour;
  public tourForm: FormGroup;
  public tourId: number;
  public keypoints: Keypoint[];

  constructor(private tourAuthoringService: TourAuthoringService, private router: Router, private route: ActivatedRoute) {
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      difficulty: new FormControl(''),
      transportType: new FormControl(''),
    });
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.tourId = Number(params.get('id'));

        if(this.tourId !== 0){
          this.tourAuthoringService.getTourById(this.tourId).subscribe((res: Tour) => {
            this.tour = res;
            this.tourForm.patchValue(this.tour);
          });

          this.tourAuthoringService.getKeypointsByTour(this.tourId).subscribe(res => {
            this.keypoints = res.results;
          });
        }
      });
  }

  ngOnChanges(): void {
  }

  saveTour(): void {
    let currentStatus = this.tourId === 0 ? Status.DRAFT : this.tour.status;
    let tour: Tour = {
      id: this.tourId,
      userId: -1,
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      price: this.tourForm.value.price,
      difficulty: this.tourForm.value.difficulty || "",
      transportType: this.tourForm.value.transportType || "",
      status: currentStatus,
      tags: []
    };

    if(this.tourId === 0){
      this.tourAuthoringService.addTour(tour).subscribe({
        next: (newTour) => { 
          window.alert("You have successfuly saved your tour");
          this.router.navigate(
            ['/tour-management', newTour.id]
          );
        }
      });
    }else{
      this.tourAuthoringService.updateTour(tour).subscribe({
        next: (updatedTour) => { 
          window.alert("You have successfuly saved your tour");
          this.tour = updatedTour;
        }
      });
    } 
  }
}

