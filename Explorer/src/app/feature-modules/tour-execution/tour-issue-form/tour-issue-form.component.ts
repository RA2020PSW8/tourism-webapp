import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourIssueService } from '../tour-issue.service';
import { TourIssue } from '../model/tour-issue.model';
import { tourIssueString } from '../model/tour-issue-string.model';
import { PagedResult } from '../shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tour-issue-form',
  templateUrl: './tour-issue-form.component.html',
  styleUrls: ['./tour-issue-form.component.css']
})
export class TourIssueFormComponent implements OnChanges {
  tourIssues: TourIssue[] = [];
  selectedTourIssue: TourIssue;

  tourIssueForm = new FormGroup({
    category: new FormControl('', Validators.required),
    priority: new FormControl(''),
    description: new FormControl('', Validators.required)
  });

  user: any = this.authservice.user$;

  constructor(private service: TourIssueService, private authservice: AuthService, private router: Router) {
    if(this.authservice.user$.value.role !== 'tourist') {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.service.getTourIssueByUserId(this.user.value.id).subscribe({
      next: (result: PagedResult<TourIssue>) => {
        this.tourIssues = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tourIssueString: tourIssueString = {
      id: this.selectedTourIssue.id,
      category: this.selectedTourIssue.category,
      priority: this.selectedTourIssue.priority.toString(),
      description: this.selectedTourIssue.description,
      dateTime: new Date().toUTCString()
    };

    this.tourIssueForm.patchValue(tourIssueString);
  }

  addTourIssue(): void {
    const tourIssue : TourIssue = {
      category: this.tourIssueForm.value.category || "",
      priority: Number(this.tourIssueForm.value.priority) || 1,
      description: this.tourIssueForm.value.description || "",
      creationDateTime: new Date(new Date().toUTCString()),
      userId: this.user.value.id,
      tourId: -1, //TODO FIX, 
      comments: []
    }

    this.clearFormFields();

    this.service.addTourIssue(tourIssue).subscribe({
      next: (_) => {
        
      }
    });
  }

  onUpdateClicked(tourIssue: TourIssue): void {
    this.selectedTourIssue = tourIssue;
  }

  onDeleteClicked(tourIssue: TourIssue): void {
    this.service.deleteTourIssue(Number(tourIssue.id)).subscribe({
      next: (_) => {
        this.ngOnInit();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  updateTourIssue(): void {
    const tourIssue : TourIssue = {
      id: this.selectedTourIssue.id,
      category: this.tourIssueForm.value.category as string,
      priority: Number(this.tourIssueForm.value.priority),
      description: this.tourIssueForm.value.description as string,
      creationDateTime: new Date(new Date().toUTCString()),
      userId: this.user.value.id,
      tourId: -1, //TODO FIX, 
      comments: []
    }

    this.clearFormFields();

    this.service.updateTourIssue(tourIssue).subscribe({
      next: (_) => {
        
      }
    });
  }

  clearFormFields(): void {
    this.tourIssueForm.value.category = "";
    this.tourIssueForm.value.priority = "";
    this.tourIssueForm.value.description = "";
  }
}
