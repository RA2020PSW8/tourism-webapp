import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { Tour } from 'src/app/feature-modules/tour-authoring/model/tour.model';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { TourPurchaseToken } from '../../marketplace/model/tour-purchase-token.model';


@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public tours: Tour[] = [];
  public isLoading = true;
  constructor(private marketplaceService: MarketplaceService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.loadArchivedAndPublishedTours();
    } else if (this.router.url === '/purchased-tours') {
      this.loadPurchasedTours();
      console.log(this.tours);
    }
  }

  loadArchivedAndPublishedTours(): void {
    this.marketplaceService.getArchivedAndPublishedTours().subscribe(tours => {
      this.tours = tours.results;
      this.isLoading = false;
    });
  }

  loadPurchasedTours(): void {
    this.marketplaceService.getPurchasedTours().subscribe(tokens => {
      tokens.results.forEach(token => {
        if (token.touristId === this.authService.user$.value.id) {
          this.addTourIfPurchased(token);
        }
      });
      this.isLoading = false;
    });
  }

  addTourIfPurchased(token: any): void {
    this.marketplaceService.getPublishedTours().subscribe(tours => {
      tours.results.forEach(tour => {
        if (token.tourId === tour.id) {
          this.tours.push(tour);
        }
      });
    });
  }
  showPopup(): void {
    const popup = document.querySelector('.popup') as HTMLElement;

    if (popup) {
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';

      setTimeout(() => {
        popup.style.visibility = 'hidden';
        popup.style.opacity = '0';
        window.location.href = 'https://www.youtube.com/watch?v=MMc8AP9KhEM';
      }, 2000);
    }
  }
}
