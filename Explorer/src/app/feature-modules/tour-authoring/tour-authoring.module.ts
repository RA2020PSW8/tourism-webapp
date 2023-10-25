import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypointComponent } from './keypoint/keypoint.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { KeypointFormComponent } from './keypoint-form/keypoint-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToursEquipmentComponent } from './tours-equipment/tours-equipment.component';
import { ToursPreviewComponent } from './tours-preview/tours-preview.component';



@NgModule({
  declarations: [
    KeypointComponent,
    KeypointFormComponent,
    ToursEquipmentComponent,
    ToursPreviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TourAuthoringModule { }
