import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClubJoinRequestFormComponent } from './club-join-request-form/club-join-request-form.component';
import { ClubJoinRequestsComponent } from './club-join-requests/club-join-requests.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClubJoinRequestFormComponent,
    ClubJoinRequestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class TouristModule { }
