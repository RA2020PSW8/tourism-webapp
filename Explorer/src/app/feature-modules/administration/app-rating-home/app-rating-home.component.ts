import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../administration.service';
import { AppRating } from '../model/app-rating.model';

@Component({
  selector: 'xp-app-rating-home',
  templateUrl: './app-rating-home.component.html',
  styleUrls: ['./app-rating-home.component.css']
})
export class AppRatingHomeComponent {
  
    appRatingIdForm = new FormGroup({
      id: new FormControl(1, [Validators.required])
    });

  constructor(private service: AdministrationService) { }

  appRating: AppRating | null;
  exist: boolean = false;

  /*sendId(): void {
    const id = this.appRatingIdForm.get('id')?.value; 
    if (id !== undefined && id !== null) {
      this.service.getAppRating(id).subscribe((rating: AppRating | null) => {
        this.appRating = rating;
      });
    }
  }*/
 
}
