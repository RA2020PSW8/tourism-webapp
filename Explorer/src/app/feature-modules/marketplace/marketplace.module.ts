import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferenceComponent } from './tour-preference/tour-preference.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';
import { ToursOverviewComponent } from './tours-overview/tours-overview.component';
import { TourCardComponent } from './tour-card/tour-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartOverviewComponent } from './shopping-cart-overview/shopping-cart-overview.component';
import { TimePipe } from 'src/app/shared/helpers/time.pipe';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourCardCompactComponent } from './tour-card-compact/tour-card-compact.component';
import { ReviewsComponent } from './dialogs/reviews/reviews.component';
import { CartWarningComponent } from './dialogs/cart-warning/cart-warning.component';
import { CartSuccessComponent } from './dialogs/cart-success/cart-success.component';
import { TourKeypointsMapComponent } from './dialogs/tour-keypoints-map/tour-keypoints-map.component';

@NgModule({
  declarations: [
    TourPreferenceComponent,
    TourPreferenceFormComponent,
    ToursOverviewComponent,
    TourCardComponent,
    ShoppingCartComponent,
    ShoppingCartOverviewComponent,
    TourCardCompactComponent,
    ReviewsComponent,
    CartWarningComponent,
    CartSuccessComponent,
    TourKeypointsMapComponent
  ],
  exports: [TourCardCompactComponent],
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
