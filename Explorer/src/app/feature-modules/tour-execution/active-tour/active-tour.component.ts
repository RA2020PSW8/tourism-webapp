import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourProgress } from '../model/tour-progress.model';
import { TourExecutionService } from '../tour-execution.service';
import { RouteQuery } from 'src/app/shared/model/routeQuery.model';
import { Position } from 'src/app/shared/model/position.model';
import { Subscription, interval } from 'rxjs';
import { Keypoint } from '../../tour-authoring/model/keypoint.model';


@Component({
  selector: 'xp-active-tour',
  templateUrl: './active-tour.component.html',
  styleUrls: ['./active-tour.component.css']
})
export class ActiveTourComponent implements OnInit, OnDestroy {

  activeTour: TourProgress | undefined;
  routeQuery: RouteQuery | undefined;
  currentPosition: Position | undefined;
  refreshMap: boolean = false; 
  currentKeyPoint: Keypoint| undefined; 

  private updateSubscription: Subscription| undefined; 

  constructor(private service: TourExecutionService) { }

  ngOnInit(): void {
      this.getActiveTour();
      this.refreshMap = true; 
      this.updateSubscription = interval(10000).subscribe( () => {
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
  
    if(this.updateSubscription){
        this.updateSubscription.unsubscribe(); 
    }
  }


  updatePosition(): void{
      this.service.updateActiveTour().subscribe({
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

    this.service.abandonTour().subscribe({
      next: (result: TourProgress) => {
        this.activeTour = undefined;
        this.routeQuery = undefined;
        this.currentPosition = undefined;
        
      }
    })
  }
}
