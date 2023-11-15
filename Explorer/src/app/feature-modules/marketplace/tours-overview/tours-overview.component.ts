import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResult } from '../../tour-execution/shared/model/paged-result.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { Position } from 'src/app/shared/model/position.model';
import { Object } from '../../tour-authoring/model/object.model';

@Component({
  selector: 'xp-tours-overview',
  templateUrl: './tours-overview.component.html',
  styleUrls: ['./tours-overview.component.css']
})
export class ToursOverviewComponent implements OnInit {

  public tours: Tour[];
  public tourFilterForm: FormGroup;
  showForm: boolean = false;
  public pointsOfInterest: Position[];
  private temporary: Position[];

  constructor(private marketplaceService: MarketplaceService) {
    this.tourFilterForm = new FormGroup({
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      filterRadius: new FormControl(1, [Validators.min(0)]),
    });

    this.tours = [];
    this.pointsOfInterest = [];
  }

  ngOnInit(): void {
    this.marketplaceService.getPublishedTours().subscribe((res: PagedResult<Tour>) => {
      this.tours = res.results;
    });
  }

  handleMapClick(event: number[]): void {
    if (event.length >= 2) {
      const latitude = event[0];
      const longitude = event[1];

      this.tourFilterForm.patchValue({
        latitude: latitude,
        longitude: longitude
      });

      this.temporary = [];

      this.marketplaceService.getPublicObjects(0, 0, latitude, longitude, this.tourFilterForm.value.filterRadius || 1).subscribe({
        next: (result: PagedResult<Object>) => {
          result.results.forEach((obj) => {
            this.temporary.push({
              longitude: obj.longitude,
              latitude: obj.latitude,
              color: 'red'
            })
          });

          this.marketplaceService.getPublicKeyPoints(0, 0, latitude, longitude, this.tourFilterForm.value.filterRadius || 1).subscribe({
            next: (result: PagedResult<Keypoint>) => {
              result.results.forEach((kp) => {
                this.temporary.push({
                  longitude: kp.longitude,
                  latitude: kp.latitude,
                  color: 'yellow'
                })
              });

              this.pointsOfInterest = this.temporary;
            }
          })
        }
      })
      
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
