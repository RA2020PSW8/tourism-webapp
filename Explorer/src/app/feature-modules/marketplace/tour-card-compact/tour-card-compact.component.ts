import { Component } from '@angular/core';
import { ReviewsComponent } from '../dialogs/reviews/reviews.component';
import { OrderItem } from '../model/order-item.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { MatDialog } from '@angular/material/dialog';
import { CartSuccessComponent } from '../dialogs/cart-success/cart-success.component';
import { CartWarningComponent } from '../dialogs/cart-warning/cart-warning.component';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourReview } from '../../tour-execution/model/tour-review.model';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'xp-tour-card-compact',
  templateUrl: './tour-card-compact.component.html',
  styleUrls: ['./tour-card-compact.component.css']
})

export class TourCardCompactComponent {
  @Output() orderUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  public reviews: TourReview[];
  public images: string[] = [];
  public startingKeypoint: Keypoint;
  public currentIndex = 0;
  public keypoints: Keypoint[] = [];
  private lastOrderId: number;

  constructor(private dialog: MatDialog, private marketplaceService: MarketplaceService, public authService: AuthService) {
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
      this.images.push(keypoint.image ?? "");
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  openReviews(tourId: number): void {
    this.dialog.open(ReviewsComponent, {
      data: tourId,
      panelClass: 'reviews-dialog-container'
    });
  }

  addToCart(): void {
    this.marketplaceService.getAllOrders().subscribe((orders) => {
      if (orders.results && orders.results.length > 0) {
        const lastOrder = orders.results[orders.results.length - 1];
        this.lastOrderId = lastOrder.id + 1;
      } else {

        this.lastOrderId = 1;
      }


      const orderItem: OrderItem = {
        id: this.lastOrderId,
        tourId: this.tour.id,
        userId: this.authService.user$.value.id,
        tourName: this.tour.name,
        tourDescription: this.tour.description,
        tourPrice: this.tour.price
      };


      this.marketplaceService.addOrderItem(orderItem).subscribe({
        next: (_) => {
          this.dialog.open(CartSuccessComponent);
          this.orderUpdated.emit();
        },
        error: (error) => {
          if (error.status === 409) {
            this.dialog.open(CartWarningComponent)
          }
        }
      });
    });
  }

}
