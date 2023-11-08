import { Component, OnInit } from '@angular/core';
import { TourIssueService } from '../tour-issue.service';
import { TourIssue } from '../model/tour-issue.model';
import { PagedResult } from '../shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tour-issue',
  templateUrl: './tour-issue.component.html',
  styleUrls: ['./tour-issue.component.css']
})
export class TourIssueComponent implements OnInit {
  constructor(private service: TourIssueService, private authservice: AuthService, private router: Router) {
    if(this.authservice.user$.value.role !== 'author') {
      this.router.navigate(['home']);
    }
  }

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

  calculateDifference(creationDate: Date): number {
    const today = new Date();
    const daysDifference = Math.floor((today.getTime() - new Date(creationDate).getTime()) / (1000 * 60 * 60 * 24));
    console.log(daysDifference);
    return daysDifference;
  }
}
