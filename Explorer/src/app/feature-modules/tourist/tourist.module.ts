import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristEquipmentComponent } from './tourist-equipment/tourist-equipment.component';
import { ClubInvitationComponent } from './club-invitation/club-invitation.component';
import { ClubInvitationFormComponent } from './club-invitation-form/club-invitation-form.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubOwnerRequestsComponent } from './club-owner-requests/club-owner-requests.component';
import { ClubJoinRequestFormComponent } from './club-join-request-form/club-join-request-form.component';
import { ClubJoinRequestsComponent } from './club-join-requests/club-join-requests.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CustomTourFormComponent } from './custom-tour-form/custom-tour-form.component';
import { TourAuthoringModule } from '../tour-authoring/tour-authoring.module';
import { TimePipe } from 'src/app/shared/helpers/time.pipe';
import { MapComponent } from 'src/app/shared/map/map.component';



@NgModule({
  declarations: [
    TouristEquipmentComponent,
    ClubJoinRequestFormComponent,
    ClubJoinRequestsComponent,
    ClubsComponent,
    ClubFormComponent,
    ClubInvitationComponent,
    ClubInvitationFormComponent,
    ClubOwnerRequestsComponent,
    CustomTourFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
    TourAuthoringModule,
    TimePipe,
    MapComponent
  ],
  exports: [
    ClubsComponent,
    TouristEquipmentComponent
  ]
})
export class TouristModule { }
