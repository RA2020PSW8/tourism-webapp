import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../administration.service';
import { AppRating } from '../model/app-rating.model';

function ratingValidator(control: AbstractControl){
  const rating = control.value;
  const valid = !isNaN(rating) && rating >= 1 && rating <= 5;
  return valid ? null : {invalidRating: true};
}


@Component({
  selector: 'xp-app-rating-form-author',
  templateUrl: './app-rating-form-author.component.html',
  styleUrls: ['./app-rating-form-author.component.css']
})
export class AppRatingFormAuthorComponent {
  successMessage: string = '';
  showForm: boolean = true;

  constructor(private service: AdministrationService) { }

  appRatingFormAuthor = new FormGroup({
    rating: new FormControl(5, [Validators.required, ratingValidator]),
    comment: new FormControl(''),
    id: new FormControl()
  })

  addAppRating(): void{
    const appRating: AppRating = {
      rating: this.appRatingFormAuthor.value.rating || 5,
      comment: this.appRatingFormAuthor.value.comment || "Najbolja app ikad!",
      id: this.appRatingFormAuthor.value.id || 22,
      lastModified: new Date()
    };
    this.service.addAppRatingAuthor(appRating).subscribe();
  }

}
