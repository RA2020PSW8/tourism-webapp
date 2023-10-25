import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypointComponent } from './keypoint/keypoint.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { KeypointFormComponent } from './keypoint-form/keypoint-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectComponent } from './object/object.component';
import { ObjectFormComponent } from './object-form/object-form.component';



@NgModule({
  declarations: [
    KeypointComponent,
    KeypointFormComponent,
    ObjectComponent,
    ObjectFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TourAuthoringModule { }
