import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourProgress } from '../model/tour-progress.model';
import { TourExecutionService } from '../tour-execution.service';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { Subscription, interval, Subject, Observable, of } from 'rxjs';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { Encounter, EncounterStatus, KeypointEncounter } from '../../tour-authoring/model/keypointEncounter.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncounterCompletion } from '../../encounters-managing/model/encounterCompletion.model';
import { switchMap, takeUntil } from 'rxjs/operators';

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

  private updateSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

  constructor(private service: TourExecutionService, private tourAuthoringService: TourAuthoringService) { }

  ngOnInit(): void {
    this.getActiveTour();
    this.refreshMap = true;
    this.updateSubscription = interval(10000).pipe(
      switchMap(() => this.activeTour !== undefined ? this.getKeypointActiveEncounters() : []),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.activeTour !== undefined) {
        this.updatePosition();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  updatePosition(): void {
    if (this.requiredEncounters.length !== 0) {
      // Do something with requiredEncounters if needed
      return;
    }

    this.service.updateActiveTour((this.requiredEncounters.length === 0)).pipe(
      switchMap((result: TourProgress) => {
        this.currentPosition = result.touristPosition;
        let previousSecret = this.currentKeyPoint?.secret;
        let previousKeypoint = this.currentKeyPoint;

        if (result.status === 'COMPLETED') {
          this.activeTour = undefined;
          this.routeQuery = undefined;
          this.currentPosition = undefined;
          this.refreshMap = false;
          this.currentKeyPoint = undefined;
          window.confirm(previousSecret)
          window.alert('Tour completed at: ' + result.touristPosition?.updatedAt);
          return of(null); // Return an observable to continue the chain
        }

        if (this.activeTour && this.activeTour.status === 'IN_PROGRESS') {
          this.currentKeyPoint = this.activeTour.tour.keypoints?.find((keypoint) => keypoint.position === result.currentKeyPoint);
          if (previousKeypoint != this.currentKeyPoint && this.currentKeyPoint?.secret !== "") {
            if (window.confirm(previousSecret)) {
              this.triggerMapRefresh();
            }
          }
          return this.getKeypointActiveEncounters();
        } else {
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      //this.triggerMapRefresh();
    });
  }

  getKeypointActiveEncounters(): Observable<any> {
    return this.tourAuthoringService.getKeypointEncounters(this.currentKeyPoint?.id || 0).pipe(
      switchMap((result: PagedResults<KeypointEncounter>) => {
        this.keypointEncounters = (result.results).filter((item: any) => item.encounter.status === EncounterStatus.ACTIVE);
        return this.getTouristCompletedEncounters();
      }),
      takeUntil(this.destroy$)
    );
  }

  getTouristCompletedEncounters(): Observable<any> {
    return this.service.getTouristCompletedEncounters().pipe(
      switchMap((result: PagedResults<EncounterCompletion>) => {
        let completedEncounters = (result.results).filter(item => item.status === 'COMPLETED');
        const completedIds = completedEncounters.map(r => r.encounter.id);
        this.requiredEncounters = this.keypointEncounters.filter(item => !completedIds.includes(item.encounterId))
        this.requiredEncounters = this.requiredEncounters.filter(item => item.isRequired === true);
        return of(null);
      }),
      takeUntil(this.destroy$)
    );
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

  triggerMapRefresh(): void {
    this.refreshMap = false;
    setTimeout(() => {
      this.refreshMap = true;
    });
  }
}
