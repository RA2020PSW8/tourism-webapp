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
  private lastOrderId = 4;
  
  constructor(private marketplaceService: MarketplaceService, private authService: AuthService) {}
  ngOnInit(): void {
    this.tour.keypoints = this.tour.keypoints?.sort((kp1, kp2) => {
      return (kp1.position || 0) - (kp2.position || 0);
    });
    if(this.tour.keypoints){
      this.firstKp = this.tour.keypoints[0];
    }
  }
  addToCart(): void {
    // Create an order item from the selected tour
    const orderItem : OrderItem = {
      id:this.lastOrderId++,
      tourId: this.tour.id,
      userId: this.authService.user$.value.id,
      tourName: this.tour.name
    };
    this.lastOrderId=this.lastOrderId++;
    // Call the service to add the order item to the cart
    this.marketplaceService.addOrderItem(orderItem).subscribe({
      next: (_) => {
        this.orderUpdated.emit()
      }
  });
  }
}
