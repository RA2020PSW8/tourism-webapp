import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourReview } from '../../tour-execution/model/tour-review.model';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { ReviewsComponent } from '../dialogs/reviews/reviews.component';
import { TourKeypointsMapComponent } from '../dialogs/tour-keypoints-map/tour-keypoints-map.component';

@Component({
  selector: 'xp-purchased-tour-card',
  templateUrl: './purchased-tour-card.component.html',
  styleUrls: ['./purchased-tour-card.component.css'],
})
export class PurchasedTourCardComponent implements OnInit {
  @Output() orderUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  public reviews: TourReview[];
  public images: string[] = [];
  public startingKeypoint: Keypoint;
  public currentIndex = 0;
  public keypoints: Keypoint[] = [];
  private lastOrderId: number;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
  ) {
    this.lastOrderId = 0;
  }

  ngOnInit(): void {
    this.tour.keypoints = this.tour.keypoints?.sort((kp1, kp2) => {
      return (kp1.position || 0) - (kp2.position || 0);
    });
    if (this.tour.keypoints) {
      this.startingKeypoint = this.tour.keypoints[0];
    }
    for (let keypoint of this.tour.keypoints ?? []) {
      this.images.push(keypoint.image ?? '');
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  openReviews(tourId: number): void {
    this.dialog.open(ReviewsComponent, {
      data: tourId,
      panelClass: 'reviews-dialog-container',
    });
  }

  showKeypoints(): void {
    this.dialog.open(TourKeypointsMapComponent, {
      data: this.tour,
      panelClass: 'keypoints-map-dialog',
    });
  }
}
