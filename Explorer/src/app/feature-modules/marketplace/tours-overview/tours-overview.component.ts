import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';

@Component({
  selector: 'xp-tours-overview',
  templateUrl: './tours-overview.component.html',
  styleUrls: ['./tours-overview.component.css']
})
export class ToursOverviewComponent implements OnInit {

  public tours: Tour[];

  constructor(private marketplaceService: MarketplaceService){}

  ngOnInit(): void {
    this.marketplaceService.getPublishedTours().subscribe((res: PagedResult<Tour>) => {
      this.tours = res.results;
    });
  }
}
