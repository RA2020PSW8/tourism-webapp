import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { EncountersPreviewComponent } from './encounters-preview/encounters-preview.component';
import { EncounterFormComponent } from './encounter-form/encounter-form.component';
import { EncountersManagingComponent } from './encounters-managing/encounters-managing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from 'src/app/shared/map/map.component';

@NgModule({
  declarations: [
    EncountersPreviewComponent,
    EncounterFormComponent,
    EncountersManagingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatButtonModule,
    ReactiveFormsModule,
    MapComponent
  ]
})
export class EncountersModule { }
