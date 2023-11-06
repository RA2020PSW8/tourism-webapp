import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewComponent } from './tour-review/tour-review.component';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { TourIssueComponent } from './tour-issue/tour-issue.component';
import { TourIssueFormComponent } from './tour-issue-form/tour-issue-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TouristPositionComponent } from './tourist-position/tourist-position.component';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourIssueByTourComponent } from './tour-issue-by-tour/tour-issue-by-tour.component';

@NgModule({
  declarations: [
    TourReviewComponent,
    TourReviewFormComponent,
    TourIssueComponent,
    TourIssueFormComponent,
    TouristPositionComponent,
    TourIssueByTourComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapComponent
  ],
  exports: [
    TourReviewComponent
  ]
})
export class TourExecutionModule { }
