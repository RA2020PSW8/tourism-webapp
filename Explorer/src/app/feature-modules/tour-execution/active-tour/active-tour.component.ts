import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourProgress } from '../model/tour-progress.model';
import { TourExecutionService } from '../tour-execution.service';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { Subscription, interval } from 'rxjs';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';
import { EncountersService } from '../../encounters-managing/encounters.service';
import { Encounter } from '../../tour-authoring/model/keypointEncounter.model';
import { PagedResult } from '../shared/model/paged-result.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncounterCompletion, EncounterCompletionStatus } from '../../encounters-managing/model/encounterCompletion.model';


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
  currentKeyPoint: Keypoint| undefined; 
  public pointsOfInterest: MarkerPosition[];
  public nearbyEncounters: Encounter[];
  private temporary: MarkerPosition[];

  private updateSubscription: Subscription| undefined; 

  constructor(private tourExecutionService: TourExecutionService, private encounterService: EncountersService) { }

  ngOnInit(): void {
      this.getActiveTour();
      this.refreshMap = true; 
      this.updateSubscription = interval(10000).subscribe( () => {
          this.updatePosition();
          this.checkNearbyEncounters();
          this.getNearbyEncounters();
      });
      this.checkNearbyEncounters();
      this.getNearbyEncounters();
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
          alert("Encounter started");
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
              console.log(result);
              encountersResult.results.forEach(encounter => {
                var encounterCompletion = result ? result.filter(ec => ec.encounterId === encounter.id)[0] : null;
                var encounterColor = 'yellow', encounterRange = 0;
                if(encounterCompletion != null) {
                  switch(encounterCompletion.status){
                    case EncounterCompletionStatus.PROGRESSING:
                    case EncounterCompletionStatus.STARTED:
                      encounterColor = 'blue';
                      encounterRange = encounter.range;
                      break;
                    case EncounterCompletionStatus.COMPLETED:
                      encounterColor = 'green';
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
        console.log(result);
        console.log(result.results);
        result.results.forEach((encounterCompletion) => {
          alert('WOOO! You completed an encounter' /*+ encounterCompletion.encounter.name*/); // nj
        });
      }
    });
  }

  ngOnDestroy(): void {
  
    if(this.updateSubscription){
        this.updateSubscription.unsubscribe(); 
    }
  }


  updatePosition(): void{
      this.tourExecutionService.updateActiveTour().subscribe({
        next: (result: TourProgress) => {
          if(this.currentPosition?.latitude !== result.touristPosition?.latitude || this.currentPosition?.longitude !== result.touristPosition?.longitude ){

            if (this.currentKeyPoint?.secret !== "") {
              if (window.confirm(this.currentKeyPoint?.secret)) {
              
              }
            }
             
            if(result.status === 'COMPLETED'){
              this.activeTour = undefined; 
              this.routeQuery = undefined; 
              this.currentPosition  = undefined; 
              this.refreshMap = false; 
              this.currentKeyPoint = undefined; 
              window.alert('Tour completed at: '+result.touristPosition?.updatedAt);
              return; 
            }
           
            this.currentPosition = result.touristPosition; 

            if(this.activeTour && this.activeTour.status === 'IN_PROGRESS') {
       
              this.currentKeyPoint = this.activeTour.tour.keypoints?.find((keypoint) => keypoint.position === result.currentKeyPoint);
            
            }

            this.triggerMapRefresh(); 
              

          }
        }

      })
  }


  getActiveTour(): void {
    this.tourExecutionService.getActiveTour().subscribe({
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

        if(this.activeTour && this.activeTour.status === 'IN_PROGRESS') {
       
          this.currentKeyPoint = this.activeTour.tour.keypoints?.find((keypoint) => keypoint.position === this.activeTour?.currentKeyPoint);

          
        
        }
      }
    })
  }

  abandonTour(): void {
    if(!window.confirm('Are you sure you want to abandon this tour?')) {
      return;
    }

    this.tourExecutionService.abandonTour().subscribe({
      next: (result: TourProgress) => {
        this.activeTour = undefined;
        this.routeQuery = undefined;
        this.currentPosition = undefined;
        
      }
    })
  }
}
