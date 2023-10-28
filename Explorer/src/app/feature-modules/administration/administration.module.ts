import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRatingComponent } from './app-rating/app-rating.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRatingFormAuthorComponent } from './app-rating-form-author/app-rating-form-author.component';
import { AppRatingTouristComponent } from './app-rating-tourist/app-rating-tourist.component';
import { AppRatingAuthorComponent } from './app-rating-author/app-rating-author.component';
import { AppRatingFormTouristComponent } from './app-rating-form-tourist/app-rating-form-tourist.component';




@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    AppRatingComponent,
    ProfileComponent,
    AppRatingFormAuthorComponent,
    AppRatingTouristComponent,
    AppRatingAuthorComponent,
    AppRatingFormTouristComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    AppRatingComponent,
    ProfileComponent,
    AppRatingFormAuthorComponent,
    AppRatingTouristComponent,
    AppRatingAuthorComponent,
    AppRatingFormTouristComponent
  ]
})
export class AdministrationModule { }
