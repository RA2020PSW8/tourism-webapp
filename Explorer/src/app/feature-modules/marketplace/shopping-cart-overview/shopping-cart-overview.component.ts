import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrderItem } from '../model/order-item.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { Wallet } from '../model/wallet.model';
import { mergeMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'xp-shopping-cart-overview',
  templateUrl: './shopping-cart-overview.component.html',
  styleUrls: ['./shopping-cart-overview.component.css'],
  providers: [MessageService],
})
export class ShoppingCartOverviewComponent implements OnInit {
  orders: OrderItem[] = [];
  loggedId: number;
  shoppingCart: ShoppingCart;
  totalPrice: number;
  wallet: Wallet;

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getWallet();
    this.loggedId = this.authService.user$.value.id;
  }

  getOrders(): void {
    this.marketplaceService.getOrdersForUser().subscribe({
      next: (result: PagedResults<OrderItem>) => {
        this.orders = result.results;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.marketplaceService.getShoppingCartForUser().subscribe({
      next: (result: ShoppingCart) => {
        this.shoppingCart = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  calculateTotalPrice(): number {
    this.totalPrice = this.orders.reduce(
      (total, order) => total + order.tourPrice,
      0,
    );
    return this.totalPrice;
  }

  checkout(): void {
    this.getOrders();
    this.calculateTotalPrice();
    if (this.wallet.adventureCoins < this.totalPrice) {
      console.log(this.wallet);
      console.log('ukupna cena: ', this.totalPrice);
      this.messageService.add({
        severity: 'warn',
        summary: 'You dont have enough ACs(adventure coins) in your wallet',
      });
    } else {
      if (
        window.confirm('Are you sure that you want to purchase these tours?')
      ) {
        this.marketplaceService
          .buyShoppingCart(Number(this.shoppingCart.id))
          .subscribe({
            next: (_) => {
              this.messageService.add({
                severity: 'warn',
                summary: 'Successfully purchased',
              });
              this.getOrders();
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'warn',
                summary: 'Some tours were already purchased',
              });
            },
          });
      }
    }
  }

  getWallet(): void {
    this.marketplaceService.getWalletForUser().subscribe({
      next: (result: Wallet) => {
        this.wallet = result;
      },
      error: (err: any) => {},
    });
  }
}
