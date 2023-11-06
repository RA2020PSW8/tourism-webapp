import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferenceComponent } from './tour-preference/tour-preference.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';
import { ToursOverviewComponent } from './tours-overview/tours-overview.component';
import { TourCardComponent } from './tour-card/tour-card.component';
import { TimePipe } from 'src/app/shared/helpers/time.pipe';
import { MapComponent } from 'src/app/shared/map/map.component';

@NgModule({
  declarations: [
    TourPreferenceComponent,
    TourPreferenceFormComponent,
    ToursOverviewComponent,
    TourCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRadioModule,
    TimePipe, 
    MapComponent
  ]
})
export class MarketplaceModule { }
