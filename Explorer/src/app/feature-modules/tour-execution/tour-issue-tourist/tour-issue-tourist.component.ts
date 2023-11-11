import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourIssueService } from '../tour-issue.service';
import { TourIssue } from '../model/tour-issue.model';
import { PagedResult } from '../shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tour-issue-tourist',
  templateUrl: './tour-issue-tourist.component.html',
  styleUrls: ['./tour-issue-tourist.component.css']
})
export class TourIssueTouristComponent implements OnChanges {
  tourIssues: TourIssue[] = [];
  selectedTourIssue: TourIssue;

  tourIssueForm = new FormGroup({
    tourId: new FormControl('', Validators.required),
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
    this.tourIssueForm.patchValue(this.selectedTourIssue);
  }

  addTourIssue(): void {
    const tourIssue : TourIssue = {
      category: this.tourIssueForm.value.category || "",
      priority: this.tourIssueForm.value.priority as string || "1",
      description: this.tourIssueForm.value.description || "",
      creationDateTime: new Date(new Date().toUTCString()),
      userId: this.user.value.id,
      tourId: this.tourIssueForm.value.tourId as string,
      comments: []
    }

    this.service.addTourIssue(tourIssue).subscribe({
      next: (_) => {
        this.clearFormFields();
        this.ngOnInit();
      }
    });
  }

  onUpdateClicked(tourIssue: TourIssue): void {
    this.selectedTourIssue = tourIssue;
    this.tourIssueForm.patchValue(tourIssue);
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
      priority: this.tourIssueForm.value.priority as string,
      description: this.tourIssueForm.value.description as string,
      creationDateTime: new Date(new Date().toUTCString()),
      userId: this.user.value.id,
      tourId: this.tourIssueForm.value.tourId as string,
      comments: []
    }

    this.clearFormFields();

    this.service.updateTourIssue(tourIssue).subscribe({
      next: (_) => {
        this.ngOnInit();
      }
    });
  }

  clearFormFields(): void {
    this.tourIssueForm.value.tourId = "";
    this.tourIssueForm.value.category = "";
    this.tourIssueForm.value.priority = "";
    this.tourIssueForm.value.description = "";
  }
}
