import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourPreference } from '../model/tour-preference.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-tour-preference-form',
  templateUrl: './tour-preference-form.component.html',
  styleUrls: ['./tour-preference-form.component.css']
})
export class TourPreferenceFormComponent implements OnChanges, OnInit {
  
  @Output() tourPreferenceUpdated = new EventEmitter<null>();
  @Input() tourPreference: TourPreference | undefined;
  @Input() tags: string[] = [];
  @Input() mode: string;

  constructor(private service: MarketplaceService) { }

  ngOnInit(): void {
      this.tags = this.tourPreference ? this.tourPreference.tags : [];
  }

  ngOnChanges(): void {
    this.tourPreferenceForm.reset();
    if(this.mode == 'edit' && this.tourPreference) {
      this.tourPreferenceForm.patchValue(this.tourPreference);
    }
  }

  tourPreferenceForm = new FormGroup({
    difficulty: new FormControl(0, [Validators.required]),
    transportType: new FormControl(0, [Validators.required]),
    newTag: new FormControl('')
  });

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

    this.tourPreferenceUpdated.emit();
  }

  confirmChanges(): void {
    this.tourPreference = {
      difficulty: this.tourPreferenceForm.value.difficulty || 0,
      transportType: this.tourPreferenceForm.value.transportType || 0,
      tags: this.tags || ""
    }

    if(this.mode == 'edit') {
      this.service.updateTourPreference(this.tourPreference).subscribe({
        next: () => { this.tourPreferenceUpdated.emit() }
      });
    }
    else if(this.mode == 'add') {
      this.service.addTourPreference(this.tourPreference).subscribe({
        next: () =>  { this.tourPreferenceUpdated.emit() }
      });
    }
  }
}
