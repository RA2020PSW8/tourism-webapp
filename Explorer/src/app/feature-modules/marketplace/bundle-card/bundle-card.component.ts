import { Component, Input, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarketplaceService } from '../marketplace.service';
import { BundlePrice } from '../model/bundle-price.model';

@Component({
  selector: 'xp-bundle-card',
  templateUrl: './bundle-card.component.html',
  styleUrls: ['./bundle-card.component.css']
})
export class BundleCardComponent implements OnInit {
  bundle!: Bundle;
  bundlePrice!: BundlePrice
  @Input() id!:number
  
  constructor(
    private router: Router,
    private service: MarketplaceService
  ) {}

  ngOnInit(): void {
    this.getBundle();
    this.getPriceForBundle();
  }

  getBundle(){
    this.service.getBundle(this.id).subscribe(
      (result) => {
        this.bundle = result;
      },
      (error) => {
        console.error('Error fetching bundle:', error);
      }
    );
  }
  getPriceForBundle() {
    this.service.getPriceForBundle(this.id).subscribe(
      (result) => {
        this.bundlePrice = result;
      },
      (error) => {
        console.error('Error fetching bundle price:', error);
      }
    );
  }

  
  navigateToBundleDetails(bundle:Bundle) {
    if (this.bundle) {
      this.router.navigate(['/bundle-details', this.bundle.id]);
    }
  }

  deleteBundle(id:number){
    this.service.deleteBundle(id).subscribe(
      (bundle)=>{},
      (error)=>{
        console.error('Error deleting Bundle:', error);
      }
    )
  }
}
