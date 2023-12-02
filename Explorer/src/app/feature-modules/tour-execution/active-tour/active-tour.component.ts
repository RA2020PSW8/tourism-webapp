import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourProgress } from '../model/tour-progress.model';
import { TourExecutionService } from '../tour-execution.service';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { Subscription, interval } from 'rxjs';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { Encounter, EncounterStatus, KeypointEncounter } from '../../tour-authoring/model/keypointEncounter.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncounterCompletion } from '../../encounters-managing/model/encounterCompletion.model';


@Component({
  selector: 'xp-active-tour',
  templateUrl: './active-tour.component.html',
  styleUrls: ['./active-tour.component.css']
})
export class ActiveTourComponent implements OnInit, OnDestroy {

  activeTour: TourProgress | undefined;
  routeQuery: RouteQuery | undefined;
  currentPosition: MarkerPosition | undefined;
  refreshMap: boolean = false;
  currentKeyPoint: Keypoint | undefined;
  public keypointEncounters: KeypointEncounter[];
  public requiredEncounters: KeypointEncounter[] = [];
  public passedKeypoints: number = 0;

  private updateSubscription: Subscription | undefined;

  constructor(private service: TourExecutionService, private tourAuthoringService: TourAuthoringService) { }

  ngOnInit(): void {
    this.getActiveTour();
    this.refreshMap = true;
    this.updateSubscription = interval(10000).subscribe(() => {
      if (this.requiredEncounters.length !== 0)
        this.getTouristCompletedEncounters();
      else
        this.updatePosition();
    });



  }
  triggerMapRefresh(): void {
    this.refreshMap = false;
    setTimeout(() => {
      this.refreshMap = true;
    });
  }



  ngOnDestroy(): void {

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }


  updatePosition(): void {
    this.passedKeypoints += 1;
    this.service.updateActiveTour(this.passedKeypoints).subscribe({
      next: (result: TourProgress) => {
        if (this.currentPosition?.latitude !== result.touristPosition?.latitude || this.currentPosition?.longitude !== result.touristPosition?.longitude) {

          if (this.currentKeyPoint?.secret !== "") {
            if (window.confirm(this.currentKeyPoint?.secret)) {

            }
          }

          if (result.status === 'COMPLETED') {
            this.activeTour = undefined;
            this.routeQuery = undefined;
            this.currentPosition = undefined;
            this.refreshMap = false;
            this.currentKeyPoint = undefined;
            window.alert('Tour completed at: ' + result.touristPosition?.updatedAt);
            return;
          }

          this.currentPosition = result.touristPosition;

          if (this.activeTour && this.activeTour.status === 'IN_PROGRESS') {

            this.currentKeyPoint = this.activeTour.tour.keypoints?.find((keypoint) => keypoint.position === result.currentKeyPoint);

          }
          this.triggerMapRefresh();
        }
        this.getKeypointActiveEncounters();
      }

    })
  }
  getTouristCompletedEncounters(): void {
    this.service.getTouristCompletedEncounters().subscribe({
      next: (result: PagedResults<EncounterCompletion>) => {
        let completedEncouners = (result.results).filter(item => item.status === 'COMPLETED');
        const compltedIds = completedEncouners.map(r => r.encounter.id);
        this.requiredEncounters = this.keypointEncounters.filter(item => !compltedIds.includes(item.encounterId))
        this.requiredEncounters = this.requiredEncounters.filter(item => item.isRequired === true);
      }
    });
  }
  getKeypointActiveEncounters(): void {
    this.tourAuthoringService.getKeypointEncounters(this.currentKeyPoint?.id || 0).subscribe({
      next: (result: PagedResults<KeypointEncounter>) => {
        this.keypointEncounters = (result.results).filter((item: any) => item.encounter.status === EncounterStatus.ACTIVE);
        this.getTouristCompletedEncounters();
      }
    });
  }

  getActiveTour(): void {
    this.service.getActiveTour().subscribe({
      next: (result: TourProgress) => {
        this.activeTour = result;
        this.routeQuery = {
          keypoints: this.activeTour.tour.keypoints || [],
          transportType: this.activeTour.tour.transportType || 'WALK'
        }
        this.currentPosition = {
          longitude: this.activeTour.touristPosition?.longitude || 0,
          latitude: this.activeTour.touristPosition?.latitude || 0,
        }

        if (this.activeTour && this.activeTour.status === 'IN_PROGRESS') {

          this.currentKeyPoint = this.activeTour.tour.keypoints?.find((keypoint) => keypoint.position === this.activeTour?.currentKeyPoint);
        }
        this.getKeypointActiveEncounters();
      }
    })
  }

  abandonTour(): void {
    if (!window.confirm('Are you sure you want to abandon this tour?')) {
      return;
    }

    this.service.abandonTour().subscribe({
      next: (result: TourProgress) => {
        this.activeTour = undefined;
        this.routeQuery = undefined;
        this.currentPosition = undefined;

      }
    })
  }
}
