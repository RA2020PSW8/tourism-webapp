import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubFormComponent
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
