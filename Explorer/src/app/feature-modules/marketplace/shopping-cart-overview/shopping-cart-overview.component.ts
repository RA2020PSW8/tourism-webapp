import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrderItem } from '../model/order-item.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { Coupon } from '../model/coupon-model';

@Component({
  selector: 'xp-shopping-cart-overview',
  templateUrl: './shopping-cart-overview.component.html',
  styleUrls: ['./shopping-cart-overview.component.css']
})
export class ShoppingCartOverviewComponent implements OnInit {

  orders: OrderItem[] =  []; 

  loggedId: number; 
  shoppingCart: ShoppingCart;
  coupons: Coupon[][] = []
  selectedCoupons: any = {};
  couponsWithDiscount : Coupon [][] = [];
  originalPrices: { [key: string]: number } = {};
  
  constructor(private marketplaceService: MarketplaceService, private authService: AuthService){}

  ngOnInit(): void {
    this.loggedId = this.authService.user$.value.id; 
    this.getOrders(); 
  }
  getOrders(): void{
    this.marketplaceService.getOrdersForUser().subscribe({
      next: (result:PagedResults<OrderItem>) => {
        this.orders = result.results;
        for(let order of this.orders){
          this.marketplaceService.getCouponsForTourAndTourist(order.tourId!, this.loggedId).subscribe({
            next: (result:PagedResults<Coupon>) => {
              this.coupons.push(result.results);
              this.couponsWithDiscount.push(result.results);
              this.originalPrices[order.id] = order.tourPrice;
            },
            error:(err: any) => {
              console.log(err); 
            }
          })
        }
      },
      error:(err: any) => {
        console.log(err); 
      }
    })

    this.marketplaceService.getShoppingCartForUser().subscribe({
      next: (result:ShoppingCart) => {
        this.shoppingCart = result;
         
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
  }

  selectCoupon(i:any, selectedValue: any): void{

    this.selectedCoupons[i] = selectedValue;
    
    const selectedCoupon = this.couponsWithDiscount[i].find(coupon => coupon.id === selectedValue);

    this.orders[i].tourPrice = this.originalPrices[this.orders[i].id];

    if (selectedCoupon) {
      const discount = selectedCoupon.discount;
      const originalTourPrice = this.orders[i].tourPrice;
  
      this.orders[i].tourPrice = originalTourPrice - (originalTourPrice * (discount / 100));
    }
  }

  isCouponSelected(couponId: any): boolean {
    return  Object.values(this.selectedCoupons).includes(couponId);
  }
  
  calculateTotalPrice(): number {
    return this.orders.reduce((total, order) => total + order.tourPrice, 0);
  }
  checkout() : void{
    this.marketplaceService.buyShoppingCart(Number(this.shoppingCart.id)).subscribe({
      next: (_) => {
        window.alert('Successfully purchased');
        this.getOrders(); 
      },
      error: (err: any) => {
        console.log(err);
        alert('Error. Some tours were already purchased.');
      }
    })
  }
}
