import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourExecutionStatus, TourProgress } from '../model/tour-progress.model';
import { TourExecutionService } from '../tour-execution.service';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { Subscription, interval, Subject, Observable, of } from 'rxjs';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { Encounter, EncounterStatus, EncounterType, KeypointEncounter } from '../../tour-authoring/model/keypointEncounter.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { EncountersService } from '../../encounters-managing/encounters.service';
import { PagedResult } from '../shared/model/paged-result.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncounterCompletion, EncounterCompletionStatus } from '../../encounters-managing/model/encounterCompletion.model';
import { Blog, BlogSystemStatus } from '../../blog/model/blog.model';
import { TouristPosition } from '../model/tourist-position.model';

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

  showBlog: boolean = false;
  activeTourCopy : TourProgress | undefined;
  newBlog: Blog = {
    title: '',
    description: '',
    imageLinks: [],
    creationDate: Date.now().toString(),
    systemStatus: BlogSystemStatus.DRAFT
  };
  public pointsOfInterest: MarkerPosition[];
  public nearbyEncounters: Encounter[];
  private temporary: MarkerPosition[];

  private updateSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

  constructor(private service: TourExecutionService, private tourAuthoringService: TourAuthoringService, private encounterService: EncountersService) { }

  ngOnInit(): void {
    this.getActiveTour();
    this.refreshMap = true;
    this.checkNearbyEncounters();
    this.getNearbyEncounters();
    this.updateSubscription = interval(10000).pipe(
      switchMap(() => this.activeTour !== undefined ? this.getKeypointActiveEncounters() : []),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.activeTour !== undefined) {
        this.updatePosition();
        this.checkNearbyEncounters();
        this.getNearbyEncounters();
      }
    });
  }

  triggerMapRefresh(): void {
    this.refreshMap = false; 
    setTimeout(() => {
      this.refreshMap = true; 
    });
  }

  startEncounter(encounter: Encounter): void {
    this.encounterService.startEncounter(encounter).subscribe({
      next: (result: EncounterCompletion) =>{
          alert("Encounter started, go to started encounters to finish");
      },
      error: (error) => {
        alert("Cannot start encounter");
      }
    });
}

  getNearbyEncounters(): void {
    this.temporary = [];

    this.encounterService.getNearbyEncounters().subscribe({
      next: (encountersResult: PagedResults<Encounter>) => {
        this.nearbyEncounters = encountersResult.results;
        var encounterIds = encountersResult.results.map((enc) => enc.id);
        if(encounterIds != undefined){
          this.encounterService.getEncounterCompletionsByIds(encounterIds).subscribe({
            next: (result: EncounterCompletion[]) => {
              encountersResult.results.forEach(encounter => {
                var encounterCompletion = result ? result.filter(ec => ec.encounterId === encounter.id)[0] : null;
                var encounterColor = encounter.type.toString().toLowerCase(), encounterRange = 0;
                if(encounterCompletion != null) {
                  switch(encounterCompletion.status){
                    case EncounterCompletionStatus.PROGRESSING:
                    case EncounterCompletionStatus.STARTED:
                      encounterColor = encounterColor + "-started";
                      encounterRange = encounter.range;
                      break;
                    case EncounterCompletionStatus.COMPLETED:
                      encounterColor = encounterColor + "-completed";
                      break;
                  }
                }

                this.temporary.push({
                  longitude: encounter.longitude,
                  latitude: encounter.latitude,
                  color: encounterColor,
                  title: encounter.name,
                  radiusSize: encounterRange
                })
              });

              this.pointsOfInterest = this.temporary;
            }
          })
        }
      }
    });
  }

  // dummy way for updating nearby stuff, can't bother now to do it better on backend
  checkNearbyEncounters(): void {
    this.encounterService.checkNearbyEncounters().subscribe({
      next: (result: PagedResults<EncounterCompletion>) => {
        if(result.results){
          result.results.forEach((encounterCompletion) => {
            alert('WOOO! You completed an encounter' /*+ encounterCompletion.encounter.name*/); // nj
          });
        }
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
      this.service.getTouristPosition().subscribe({
          next: (result: TouristPosition) =>{
            if(this.currentPosition?.longitude !== result.longitude || this.currentPosition.latitude !== result.latitude){
              this.currentPosition = result;
              this.currentPosition.color = "walking";
              this.triggerMapRefresh();
            }
          }
      });
      return;
    }

    this.service.updateActiveTour((this.requiredEncounters.length === 0)).pipe(
      switchMap((result: TourProgress) => {
        if(!result.touristPosition) return of(null);
        this.currentPosition = result.touristPosition;
        this.currentPosition.color = "walking";
        let previousSecret = this.currentKeyPoint?.secret;
        let previousKeypoint = this.currentKeyPoint;

        if (result.status === 'COMPLETED') {
          this.activeTour = undefined;
          this.routeQuery = undefined;
          this.currentPosition = undefined;
          this.refreshMap = false;
          this.currentKeyPoint = undefined;
          window.confirm(previousSecret)
          this.showBlogForm(result.status);
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
          this.triggerMapRefresh();
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
        this.activeTourCopy = result;
        this.routeQuery = {
          keypoints: this.activeTour.tour.keypoints || [],
          transportType: this.activeTour.tour.transportType || 'WALK'
        }
        this.currentPosition = {
          longitude: this.activeTour.touristPosition?.longitude || 0,
          latitude: this.activeTour.touristPosition?.latitude || 0,
          color: 'walking'
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
  showBlogForm(status: TourExecutionStatus): void{
    if(status === 'COMPLETED')
    {            
      this.showBlog = confirm("Would you like create a blog?");
    }
  }
 
}
