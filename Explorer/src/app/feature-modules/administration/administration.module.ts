import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { AppRatingComponent } from './app-rating/app-rating.component';
=======
import { ProfileComponent } from './profile/profile.component';

>>>>>>> develop



@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
<<<<<<< HEAD
    AppRatingComponent
=======
    ProfileComponent,
    
>>>>>>> develop
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
<<<<<<< HEAD
    AppRatingComponent
=======
    ProfileComponent
>>>>>>> develop
  ]
})
export class AdministrationModule { }
