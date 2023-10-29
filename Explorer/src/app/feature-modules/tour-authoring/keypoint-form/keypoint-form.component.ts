import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Keypoint } from '../model/keypoint.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-keypoint-form',
  templateUrl: './keypoint-form.component.html',
  styleUrls: ['./keypoint-form.component.css']
})
export class KeypointFormComponent implements OnChanges{

  @Output() keypointUpdated = new EventEmitter<null>();
  @Input() keypoint: Keypoint;
  @Input() mode: string = 'add';

  public keypointForm: FormGroup;

  constructor(private tourAuthoringService: TourAuthoringService) {
    this.keypointForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      latitude: new FormControl(0, [Validators.min(-90), Validators.max(90)]),
      longitude: new FormControl(0, [Validators.min(-180), Validators.max(180)]),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }

  ngOnChanges(): void {
    this.keypointForm.reset();
    if(this.mode === 'edit') {
      this.keypointForm.patchValue(this.keypoint);
    }
  }

  saveKeypoint(): void {
    let keypoint: Keypoint = {
      name: this.keypointForm.value.name || "",
      latitude: this.keypointForm.value.latitude || 0,
      longitude: this.keypointForm.value.longitude || 0,
      description: this.keypointForm.value.description || "",
      image: this.keypointForm.value.image || "",
    };
    
    if(this.mode === 'add'){
      this.tourAuthoringService.addKeypoint(keypoint).subscribe({
        next: () => { this.keypointUpdated.emit() }
      });
    }else if( this.mode === 'edit'){
      keypoint.id = this.keypoint.id;
      this.tourAuthoringService.updateKeypoint(keypoint).subscribe({
        next: () => { this.keypointUpdated.emit() }
      });
    } 
  }

  fillCoords(event: number[]): void {
    this.keypointForm.patchValue({
      latitude: event[0],
      longitude: event[1]
    })
  }
}
