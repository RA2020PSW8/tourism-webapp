import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Keypoint } from '../model/keypoint.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { RouteInfo } from 'src/app/shared/model/routeInfo.model';

@Component({
  selector: 'xp-keypoint-form',
  templateUrl: './keypoint-form.component.html',
  styleUrls: ['./keypoint-form.component.css']
})
export class KeypointFormComponent implements OnChanges{

  @Output() keypointsUpdated = new EventEmitter<Keypoint>();
  @Output() routeFound = new EventEmitter<RouteInfo>();

  @Input() tourId: number;
  @Input() routeQuery: RouteQuery;
  @Input() selectedKeypoint: Keypoint;
  @Input() keypointsCount: number = 0;
  @Input() mode: string = 'add';

  public keypointForm: FormGroup;

  constructor(private tourAuthoringService: TourAuthoringService) {
    this.keypointForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      latitude: new FormControl(0, [Validators.min(-90), Validators.max(90)]),
      longitude: new FormControl(0, [Validators.min(-180), Validators.max(180)]),
      description: new FormControl(''),
      image: new FormControl(''),
      secret: new FormControl(''), 
      position: new FormControl(this.keypointsCount+1, [Validators.required, Validators.min(1)])
    });
  }

  ngOnChanges(): void {
    this.keypointForm.reset();
    this.keypointForm.patchValue({'position': this.keypointsCount + 1});
    if(this.mode === 'edit') {
      this.keypointForm.patchValue(this.selectedKeypoint);
    }
  }

  saveKeypoint(): void {
    if(this.tourId === 0){
      window.alert("You can not add keypoint to undrafted tour");
    }else if(!this.keypointForm.valid){
      window.alert("Form invalid");
    }else{
      let keypoint: Keypoint = {
        tourId: this.tourId,
        name: this.keypointForm.value.name || "",
        latitude: this.keypointForm.value.latitude || 0,
        longitude: this.keypointForm.value.longitude || 0,
        description: this.keypointForm.value.description || "",
        image: this.keypointForm.value.image || "",
        secret: this.keypointForm.value.secret || "", 
        position: this.keypointForm.value.position || 0
      };
      
      if(this.mode === 'add'){
        this.tourAuthoringService.addKeypoint(keypoint).subscribe({
          next: () => { 
            this.keypointsUpdated.emit();
            this.keypointForm.reset();
            this.keypointForm.clearValidators();
          }
        });
      }else if( this.mode === 'edit'){
        keypoint.id = this.selectedKeypoint.id;
        this.tourAuthoringService.updateKeypoint(keypoint).subscribe({
          next: () => {
            window.alert(`You have successfuly updated ${keypoint.name}`);
            this.keypointsUpdated.emit(); 
            this.keypointForm.reset();
            this.keypointForm.clearValidators();
          }
        });
      } 
    }
  }

  fillCoords(event: number[]): void {
    this.keypointForm.patchValue({
      latitude: event[0],
      longitude: event[1]
    })
  }

  routeFoundEmit(routeInfo: RouteInfo){
    this.routeFound.emit(routeInfo);
  }
}
