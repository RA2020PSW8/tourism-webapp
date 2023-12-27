import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { Tour } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-purchased-tours',
  templateUrl: './purchased-tours.component.html',
  styleUrls: ['./purchased-tours.component.css'],
})
export class PurchasedToursComponent implements OnInit {
  public tours: Tour[] = [];
  public customTours: Tour[] = [];
  public isLoading = true;

  constructor(
    private marketplaceService: MarketplaceService,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.loadPurchasedTours();
    this.loadCustomTours();
  }

  loadPurchasedTours(): void {
    this.marketplaceService.getPurchasedTours().subscribe((tokens) => {
      tokens.results.forEach((token) => {
        if (token.touristId === this.authService.user$.value.id) {
          this.addTourIfPurchased(token);
        }
      });
      this.isLoading = false;
    });
  }

  loadCustomTours(): void {
    this.marketplaceService.getCustomTours().subscribe((res) => {
      this.customTours = res.results;
      console.log(this.customTours);
    });
  }

  addTourIfPurchased(token: any): void {
    this.marketplaceService.getPublishedTours().subscribe((tours) => {
      tours.results.forEach((tour) => {
        if (token.tourId === tour.id) {
          this.tours.push(tour);
        }
      });
    });
  }

  navigateToTourManagement(id: number): void {
    this.router.navigate(['/custom-tour', id]);
  }

  navigateToCampaignCreation(id: number): void {
    this.router.navigate(['/campaign/', id]);
  }
}
