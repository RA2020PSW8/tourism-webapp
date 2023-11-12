import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrderItem } from '../model/order-item.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ShoppingCart } from '../model/shopping-cart.model';

@Component({
  selector: 'xp-shopping-cart-overview',
  templateUrl: './shopping-cart-overview.component.html',
  styleUrls: ['./shopping-cart-overview.component.css']
})
export class ShoppingCartOverviewComponent implements OnInit {

    orders: OrderItem[] =  []; 
  loggedId: number; 
  shoppingCart: ShoppingCart;
  constructor(private marketplaceService: MarketplaceService, private authService: AuthService){}

  ngOnInit(): void {
    this.getOrders(); 
    this.loggedId = this.authService.user$.value.id; 
  }
  getOrders(): void{
    this.marketplaceService.getOrdersForUser().subscribe({
      next: (result:PagedResults<OrderItem>) => {
        this.orders = result.results;
         
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
