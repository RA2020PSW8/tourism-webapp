import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { Bundle } from '../model/bundle.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { BundlePrice } from '../model/bundle-price.model';

@Component({
  selector: 'xp-bundle-details',
  templateUrl: './bundle-details.component.html',
  styleUrls: ['./bundle-details.component.css']
})
export class BundleDetailsComponent implements OnInit {
  bundleId: number;
  bundle:Bundle;
  editing:boolean = false;
  tours: Tour[];
  toursByAuthor:Tour[];
  name:string
  newName:string = '';
  price:number;
  bundlePrice: BundlePrice
  

  constructor(private route: ActivatedRoute, private service:MarketplaceService) {}

  ngOnInit(): void {
    // Retrieve bundleId and price from the route parameters
    const bundleIdParam = this.route.snapshot.paramMap.get('bundleId');
    this.bundleId = +[bundleIdParam]
    this.getPriceForBundle(this.bundleId);
    this.getBundle(this.bundleId);
    this.getToursByAuthor();
  }

  getPriceForBundle(id:number) {
    this.service.getPriceForBundle(id).subscribe(
      (result) => {
        this.bundlePrice = result;
      },
      (error) => {
        console.error('Error fetching bundle price:', error);
      }
    );
  }
  getBundle(id:number){
    this.service.getBundle(id).subscribe(
      (result) => {
        this.bundle = result;
      },
      (error) => {
        console.error('Error fetching bundle:', error);
      }
    );
  }
  
  toggleEditing() {
    this.editing = !this.editing;
  }

  saveName() {
    if (this.bundle && this.newName !== this.bundle.name) {
      this.bundle.name = this.newName;

      
      this.service.updateBundle().subscribe(
        (updatedBundle) => {
          console.log('Bundle name updated successfully:', updatedBundle);
          this.toggleEditing(); 
        },
        (error) => {
          console.error('Error updating bundle name:', error);
          
        }
      );
    } else {
      this.toggleEditing();
    }
  }
  getToursByAuthor(){
      this.service.getToursByAuthor().subscribe(
        (result)=>{
          this.toursByAuthor= result.results;
        },
        (error)=>{
          console.error('Error fethching tours', error);
        }
      )
    }

    addToBundle(tourId: number, bundleId: number) {
      // Call your service method to add the tour to the bundle
      this.service.addTourToBundle(tourId, bundleId).subscribe(
        (result) => {
          console.log('Tour added to bundle successfully:', result);
          // Refresh the tours in the bundle after adding a new one
          this.getBundle(bundleId);
        },
        (error) => {
          console.error('Error adding tour to bundle:', error);
        }
      );
    }
  
    deleteFromBundle(tourId: number, bundleId: number) {
      // Call your service method to add the tour to the bundle
      this.service.deleteTourFromBundle(tourId, bundleId).subscribe(
        (result) => {
          console.log('Tour added to bundle successfully:', result);
          // Refresh the tours in the bundle after adding a new one
          this.getBundle(bundleId);
        },
        (error) => {
          console.error('Error adding tour to bundle:', error);
        }
      );
    }
}