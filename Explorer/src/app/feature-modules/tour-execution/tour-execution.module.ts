import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewComponent } from './tour-review/tour-review.component';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { TourIssueComponent } from './tour-issue/tour-issue.component';
import { TourIssueFormComponent } from './tour-issue-form/tour-issue-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TourReviewComponent,
    TourReviewFormComponent,
    TourIssueComponent,
    TourIssueFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TourReviewComponent
  ]
})
export class TourExecutionModule { }
