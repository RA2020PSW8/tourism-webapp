import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrderItem } from '../model/order-item.model';

@Component({
  selector: 'xp-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {

  @Output() orderUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  public firstKp: Keypoint;
  private lastOrderId: number;

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService) {
    this.lastOrderId = 0; // Initialize lastOrderId
  }

  ngOnInit(): void {
    this.tour.keypoints = this.tour.keypoints?.sort((kp1, kp2) => {
      return (kp1.position || 0) - (kp2.position || 0);
    });
    if (this.tour.keypoints) {
      this.firstKp = this.tour.keypoints[0];
    }
  }

  addToCart(): void {
    // Fetch the last order from getAllOrders and use its id to generate the next id
    this.marketplaceService.getAllOrders().subscribe((orders) => {
      if (orders.results && orders.results.length > 0) {
        const lastOrder = orders.results[orders.results.length - 1];
        this.lastOrderId = lastOrder.id + 1;
      } else {
        // No orders in the list, start with id 1
        this.lastOrderId = 1;
      }

      // Create an order item with the generated id
      const orderItem: OrderItem = {
        id: this.lastOrderId,
        tourId: this.tour.id,
        userId: this.authService.user$.value.id,
        tourName: this.tour.name,
        tourDescription: this.tour.description,
        tourPrice: this.tour.price
      };

      // Call the service to add the order item to the cart
      this.marketplaceService.addOrderItem(orderItem).subscribe({
        next: (_) => {
          this.orderUpdated.emit();
        }
      });
    });
  }
}
