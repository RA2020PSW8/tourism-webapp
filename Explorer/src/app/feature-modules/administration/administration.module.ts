import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRatingComponent } from './app-rating/app-rating.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRatingFormComponent } from './app-rating-form/app-rating-form.component';
import { AppRatingHomeComponent } from './app-rating-home/app-rating-home.component';
import { AppRatingFormAuthorComponent } from './app-rating-form-author/app-rating-form-author.component';




@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    AppRatingComponent,
    ProfileComponent,
    AppRatingFormComponent,
    AppRatingHomeComponent,
    AppRatingFormAuthorComponent
    
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
    AppRatingFormComponent,
    AppRatingHomeComponent,
    AppRatingFormAuthorComponent
  ]
})
export class AdministrationModule { }
