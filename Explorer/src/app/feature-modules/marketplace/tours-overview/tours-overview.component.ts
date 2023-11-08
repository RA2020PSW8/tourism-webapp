import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'xp-tours-overview',
  templateUrl: './tours-overview.component.html',
  styleUrls: ['./tours-overview.component.css']
})
export class ToursOverviewComponent implements OnInit {

  public tours: Tour[];
  public tourFilterForm: FormGroup;
  
  constructor(
    private marketplaceService: MarketplaceService,
    private formBuilder: FormBuilder,
    private router: Router 
  ) {
    this.tourFilterForm = this.formBuilder.group({
      latitude: [''],
      longitude: [''],
      filterRadius: ['']
    });
  }

  ngOnInit(): void {
    this.marketplaceService.getPublishedTours().subscribe((res: PagedResult<Tour>) => {
      this.tours = res.results;
    });
  }

  fillParams(event: number[]): void {
    if (event.length >= 2) {
      const latitude = event[0];
      const longitude = event[1];
  
      
      
      this.tourFilterForm.patchValue({
        latitude: latitude,
        longitude: longitude
      });
    }
  }

  getFilteredTours() {
    const { latitude, longitude, filterRadius } = this.tourFilterForm.value;
    
    this.marketplaceService.getFilteredTours(1, 5, latitude, longitude, filterRadius)
      .subscribe((res: PagedResult<Tour>) => {
        this.tours = res.results;
        
      });
  }
}
