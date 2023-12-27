import { Component, OnInit } from '@angular/core';
import { WishListItem } from '../model/wish-list-item.model';
import { WishList } from '../model/wish-list.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { endWith } from 'rxjs';

@Component({
  selector: 'xp-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishListItems: WishListItem[] = [];
  wishList: WishList;

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService){}

  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems(): void{
    this.marketplaceService.getWishListItemsForUser().subscribe({
      next: (value : PagedResults<WishListItem>) => {
        this.wishListItems = value.results;
        console.log(this.wishListItems);
        console.log(value.results);

      },
      error:(err: any) => {
        console.log(err); 
      }
    })
    this.marketplaceService.getWishListForUser().subscribe({
      next: (result: WishList) => {
        this.wishList = result;
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
  }
}
