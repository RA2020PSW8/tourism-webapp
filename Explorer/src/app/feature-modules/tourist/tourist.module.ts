import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ClubInvitationComponent } from './club-invitation/club-invitation.component';
import { ClubInvitationFormComponent } from './club-invitation-form/club-invitation-form.component';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubFormComponent,
    ClubInvitationComponent,
    ClubInvitationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ], 
  exports:[
    ClubsComponent
  ]
})
export class TouristModule { }
