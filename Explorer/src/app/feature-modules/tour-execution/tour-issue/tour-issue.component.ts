import { Component, OnInit } from '@angular/core';
import { TourIssueService } from '../tour-issue.service';
import { TourIssue } from '../model/tour-issue.model';
import { PagedResult } from '../shared/model/paged-result.model';

@Component({
  selector: 'xp-tour-issue',
  templateUrl: './tour-issue.component.html',
  styleUrls: ['./tour-issue.component.css']
})
export class TourIssueComponent implements OnInit {
  constructor(private service: TourIssueService) {}

  tourIssues: TourIssue[] = [];
  selectedTourIssue: TourIssue;

  ngOnInit(): void {
    this.service.getTourIssues().subscribe({
      next: (result: PagedResult<TourIssue>) => {
        this.tourIssues = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getTourIssues(): void {
    this.service.getTourIssues().subscribe({
      next: (result: PagedResult<TourIssue>) => {
        this.tourIssues = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onUpdateClicked(tourIssue: TourIssue): void {
    this.selectedTourIssue = tourIssue;
  }

  onDeleteClicked(tourIssue: TourIssue): void {
    this.service.deleteTourIssue(Number(tourIssue.id)).subscribe({
      next: (_) => {
        this.getTourIssues();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
