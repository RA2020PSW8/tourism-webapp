import { Component, OnInit } from '@angular/core';
import { TourExecutionService } from '../tour-execution.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourReview } from '../model/tour-review.model';

@Component({
  selector: 'xp-tour-review',
  templateUrl: './tour-review.component.html',
  styleUrls: ['./tour-review.component.css']
})
export class TourReviewComponent implements OnInit {

  tourReview: TourReview[] = [];
  selectedTourReview: TourReview;
  shouldEdit: boolean;

  constructor(private service: TourExecutionService) {}

  ngOnInit(): void {
    this.getTourReviews();
  }

  getTourReviews(): void {
    this.service.getTourReviews().subscribe({
      next: (result: PagedResults<TourReview>) => {
        this.tourReview = result.results;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onEditClicked(tourReview: TourReview): void {
    this.shouldEdit = true;
    this.selectedTourReview = tourReview;
    console.log(tourReview);
  }
}
