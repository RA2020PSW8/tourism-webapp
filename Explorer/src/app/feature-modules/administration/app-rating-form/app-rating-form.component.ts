import { Component, OnInit } from '@angular/core';
import { AppRating } from '../model/app-rating.model';
import { AdministrationService } from '../administration.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
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

  appRatingForm = new FormGroup({
    rating: new FormControl('5', [Validators.required, ratingValidator]),
    comment: new FormControl('' )
  })

  addAppRating(): void{
    console.log(this.appRatingForm.value)
  }
}
