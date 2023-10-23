import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypointComponent } from './keypoint/keypoint.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { KeypointFormComponent } from './keypoint-form/keypoint-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToursTestModuleComponent } from './tours-test-module/tours-test-module.component';
import { MapComponent } from 'src/app/shared/map/map.component';

@NgModule({
  declarations: [
    KeypointComponent,
    KeypointFormComponent,
    ToursTestModuleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapComponent
  ]
})
export class TourAuthoringModule { }
