import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypointComponent } from './keypoint/keypoint.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { KeypointFormComponent } from './keypoint-form/keypoint-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectComponent } from './object/object.component';
import { ObjectFormComponent } from './object-form/object-form.component';
import { ToursTestModuleComponent } from './tours-test-module/tours-test-module.component';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ToursEquipmentComponent } from './tours-equipment/tours-equipment.component';
import { ToursPreviewComponent } from './tours-preview/tours-preview.component';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    KeypointComponent,
    KeypointFormComponent,
    ObjectComponent,
    ObjectFormComponent,
    ToursTestModuleComponent,
    ToursEquipmentComponent,
    ToursPreviewComponent,
    TourComponent,
    TourFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapComponent,
    RouterModule
  ]
})
export class TourAuthoringModule { }
