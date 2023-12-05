import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewComponent } from './tour-review/tour-review.component';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TouristPositionComponent } from './tourist-position/tourist-position.component';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourIssueAdminComponent } from './tour-issue-admin/tour-issue-admin.component';
import { TourIssueTouristComponent } from './tour-issue-tourist/tour-issue-tourist.component';
import { TourIssueComponent } from './tour-issue/tour-issue.component';
import { ActiveTourComponent } from './active-tour/active-tour.component';
import { TimePipe } from 'src/app/shared/helpers/time.pipe';
import { BlogModule } from '../blog/blog.module';
import { BlogFormComponent } from '../blog/blog-form/blog-form.component';

@NgModule({
  declarations: [
    TourReviewComponent,
    TourReviewFormComponent,
    TouristPositionComponent,
    TourIssueAdminComponent,
    TourIssueTouristComponent,
    TourIssueComponent,
    ActiveTourComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapComponent,
    BlogModule,
    TimePipe
  ],
  exports: [
    TourReviewComponent
  ]
})
export class TourExecutionModule { }
