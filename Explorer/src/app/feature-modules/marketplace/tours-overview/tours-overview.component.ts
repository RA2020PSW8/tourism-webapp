import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'xp-tours-overview',
  templateUrl: './tours-overview.component.html',
  styleUrls: ['./tours-overview.component.css']
})
export class ToursOverviewComponent implements OnInit {

  public tours: Tour[];
  public tourFilterForm: FormGroup;
  showForm: boolean = false;

  
  constructor(
    private marketplaceService: MarketplaceService,
    private formBuilder: FormBuilder
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
    
    this.marketplaceService.getFilteredTours(0, 0, latitude, longitude, filterRadius)
      .subscribe((res: PagedResult<Tour>) => {
        this.tours = res.results;
      });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
