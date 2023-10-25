import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristEquipmentComponent } from './tourist-equipment/tourist-equipment.component';
import { ClubInvitationComponent } from './club-invitation/club-invitation.component';
import { ClubInvitationFormComponent } from './club-invitation-form/club-invitation-form.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TouristEquipmentComponent,
    ClubInvitationComponent,
    ClubInvitationFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TouristEquipmentComponent
  ]
})
export class TouristModule { }
