import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AppRating } from '../model/app-rating.model';
import { AdministrationService } from '../administration.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

function ratingValidator(control: AbstractControl){
  const rating = control.value;
  const valid = !isNaN(rating) && rating >= 1 && rating <= 5;
  return valid ? null : {invalidRating: true};
}

@Component({
  selector: 'xp-app-rating-form',
  templateUrl: './app-rating-form.component.html',
  styleUrls: ['./app-rating-form.component.css']
})
export class AppRatingFormComponent {

  successMessage: string = '';
  showForm: boolean = true;

  constructor(private service: AdministrationService) { }

  appRatingForm = new FormGroup({
    rating: new FormControl(5, [Validators.required, ratingValidator]),
    comment: new FormControl(''),
    id: new FormControl()
  })

  addAppRating(): void{
    const appRating: AppRating = {
      rating: this.appRatingForm.value.rating || 5,
      comment: this.appRatingForm.value.comment || "Najbolja app ikad!",
      id: this.appRatingForm.value.id || 22,
      lastModified: new Date()
    };
    this.service.addAppRating(appRating).subscribe();
  }

  
}
