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
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public tours: Tour[] = [];
  public customTours: Tour[] = [];
  public isLoading = true;

  constructor(
    private marketplaceService: MarketplaceService,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.loadArchivedAndPublishedTours();
  }

  loadArchivedAndPublishedTours(): void {
    this.marketplaceService
      .getArchivedAndPublishedTours()
      .subscribe((tours) => {
        this.tours = tours.results;
        this.isLoading = false;
      });
  }
}
