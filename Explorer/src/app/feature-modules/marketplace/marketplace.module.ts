import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferenceComponent } from './tour-preference/tour-preference.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';

@NgModule({
  declarations: [
    TourPreferenceComponent,
    TourPreferenceFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class MarketplaceModule { }
