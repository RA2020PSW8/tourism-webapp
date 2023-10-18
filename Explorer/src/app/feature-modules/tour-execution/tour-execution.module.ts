import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourIssueComponent } from './tour-issue/tour-issue.component';
import { TourIssueFormComponent } from './tour-issue-form/tour-issue-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TourIssueComponent,
    TourIssueFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TourExecutionModule { }
