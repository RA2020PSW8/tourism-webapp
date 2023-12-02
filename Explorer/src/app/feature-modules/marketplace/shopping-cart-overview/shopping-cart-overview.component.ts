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

@Component({
  selector: 'xp-shopping-cart-overview',
  templateUrl: './shopping-cart-overview.component.html',
  styleUrls: ['./shopping-cart-overview.component.css']
})
export class ShoppingCartOverviewComponent implements OnInit {

    orders: OrderItem[] =  []; 
  loggedId: number; 
  shoppingCart: ShoppingCart;
  totalPrice: number;
  wallet: Wallet;
  constructor(private marketplaceService: MarketplaceService, private authService: AuthService){}

  ngOnInit(): void {
    this.getOrders(); 
    this.getWallet();
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
    this.totalPrice = this.orders.reduce((total, order) => total + order.tourPrice, 0);
    return this.totalPrice;
    //return this.orders.reduce((total, order) => total + order.tourPrice, 0);

  }
  checkout() : void{
    this.getOrders(); // to update price if some items are removed
    this.calculateTotalPrice(); 
    if(this.wallet.adventureCoins < this.totalPrice){
      console.log(this.wallet);
      console.log('ukupna cena: ' ,this.totalPrice);
      alert('Error. You dont have enough ACs(adventure coins) in your wallet.');
    } else{  //proveri da li se ovo izvrsava kako treba, u dobrom redosledju jer iako nema dovoljno para u wallwtu, on ispise error za vec kupljenen ture iz else dela
      
      if(window.confirm('Are you sure that you want to purchase these tours?')){
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
        /*this.wallet.adventureCoins = this.wallet.adventureCoins - this.totalPrice;
        this.marketplaceService.updateWallet(this.wallet).subscribe({
          next:(result:Wallet) => {
            console.log(result);
          },
          error:(err:any) => {
            console.log(err);
          }
        })*/

      }
    }
  }
  
  /*checkout(): void {
    if (window.confirm('Are you sure that you want to purchase these tours?')) {
      if (this.wallet.adventureCoins < this.totalPrice) {
        console.log(this.wallet);
        console.log('ukupna cena: ', this.totalPrice);
        alert('Error. You dont have enough ACs(adventure coins) in your wallet.');
      } else {
        this.marketplaceService.buyShoppingCart(Number(this.shoppingCart.id)) .pipe(
          mergeMap(() => {
            this.wallet.adventureCoins = this.wallet.adventureCoins - this.totalPrice;
            return this.marketplaceService.updateWallet(this.wallet);
          })
        ).subscribe({
          next: (result: Wallet) => {
            console.log(result);
            window.alert('Successfully purchased');
            this.getOrders();
          },
          error: (err: any) => {
            console.log(err);
            alert('Error. Some tours were already purchased.');
          }
        });
      }
    }
  }*/
  

  getWallet(): void {
    this.marketplaceService.getWalletForUser().subscribe({
      next:(result:Wallet)=>{
        this.wallet=result;
      },
      error:(err:any)=>{
        console.log(err);
      }
  });
  }
  
}
