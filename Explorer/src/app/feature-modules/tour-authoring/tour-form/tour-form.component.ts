import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnChanges{

  @Output() tourUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  @Input() mode: string = 'add';

  public tourForm: FormGroup;

  constructor(private tourAuthoringService: TourAuthoringService) {
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnChanges(): void {
    this.tourForm.reset();
    if(this.mode === 'edit') {
      this.tourForm.patchValue(this.tour);
    }
  }

  saveTour(): void {
    let tour: Tour = {
      id: 0,
      price: 0,
      status: Status.DRAFT,
      userId: 1,
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      difficulty: this.tourForm.value.difficulty || "",
      transportType: this.tourForm.value.transportType || "",
      tags: []
    };
    if(this.mode === 'add'){
      this.tourAuthoringService.addTour(tour).subscribe({
        next: () => { this.tourUpdated.emit() }
      });
    }else if( this.mode === 'edit'){
      tour.id = this.tour.id;
      this.tourAuthoringService.updateTour(tour).subscribe({
        next: () => { this.tourUpdated.emit() }
      });
    } 
  }
}

