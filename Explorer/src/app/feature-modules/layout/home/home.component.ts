import { Component, Output } from '@angular/core';
import { Tour } from 'src/app/feature-modules/tour-authoring/model/tour.model';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';


@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  tours: Tour[] = [];

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.marketplaceService.getArchivedAndPublishedTours().subscribe(tours => {
      this.tours = tours.results;
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
