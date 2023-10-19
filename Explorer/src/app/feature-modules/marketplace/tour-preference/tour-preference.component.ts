import { Component, EventEmitter, OnChanges, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { TourPreference } from '../model/tour-preference.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-tour-preference',
  templateUrl: './tour-preference.component.html',
  styleUrls: ['./tour-preference.component.css']
})
export class TourPreferenceComponent implements OnChanges, OnInit {

  @Output() tourPrefereneceUpdated = new EventEmitter<null>();
  @Input() tourPreference: TourPreference | undefined;
  @Input() shouldEdit: boolean = false;
  @Input() mode: string = 'preview';
  @Input() tags: string[] = [];
  id: number = 2;

  tourPreferenceForm = new FormGroup({
    difficulty: new FormControl(0, [Validators.required]),
    transportType: new FormControl(0, [Validators.required]),
    newTag: new FormControl('')
  });

  constructor(private service: MarketplaceService) { }

  ngOnInit(): void {
    this.getTourPreference();
  }

  ngOnChanges(): void {
    this.tourPreferenceForm.reset();
    if(this.mode == 'edit' && this.tourPreference) {
      this.tourPreferenceForm.patchValue(this.tourPreference);
    }
  }

  getTourPreference(): void {
    this.tourPreference = undefined;
    this.service.getTourPreference(this.id).subscribe({
      next: (result: TourPreference) => { 
        this.tourPreference = result;
      },
      error: () => {
      }
    });
  }

  addTourPreference(): void {
    this.mode = 'add';
    this.tourPreference = {
      userId: 1,
      difficulty: 0,
      transportType: 0,
      tags: []
    }
  }

  editTourPreference(): void {
    this.mode = 'edit';
    if(this.tourPreference){
      this.tourPreferenceForm.patchValue(this.tourPreference);
      this.tags = this.tourPreference.tags;
    }
  }

  deleteTourPreference(): void {
    if(this.tourPreference) {
      this.service.deleteTourPreference(this.id).subscribe({
        next: () => { 
          this.getTourPreference();
        }
      });
    }
  }

  addTag(): void {
    if(!this.tourPreferenceForm.value.newTag) return;

    this.tags.push(this.tourPreferenceForm.value.newTag);
    this.tourPreferenceForm.value.newTag = '';
  }

  removeTag(tag: string): void {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  cancelChanges(): void {
    if(this.mode == 'add') {
      this.tourPreference = undefined;
    }
    this.mode = 'preview';
  }

  confirmChanges(): void {
    this.tourPreference = {
      userId: 1,
      difficulty: this.tourPreferenceForm.value.difficulty || 0,
      transportType: this.tourPreferenceForm.value.transportType || 0,
      tags: this.tags || ""
    }

    if(this.mode == 'edit') {
      this.tourPreference.id = this.id;
      this.service.updateTourPreference(this.id, this.tourPreference).subscribe({
        next: () => { 
          this.getTourPreference(); 
        }
      });
    }
    else if(this.mode == 'add') {
      this.service.addTourPreference(this.tourPreference).subscribe({
        next: () => { 
          this.getTourPreference(); 
        }
      });
    }
    
    this.mode = 'preview';
  }
}
