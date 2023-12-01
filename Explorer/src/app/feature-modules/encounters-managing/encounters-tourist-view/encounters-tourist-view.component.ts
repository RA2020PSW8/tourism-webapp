import { Component, OnInit, ViewChild } from '@angular/core';
import { EncountersService } from '../encounters.service';
import { Encounter } from '../model/encounter.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { EncounterCompletion, EncounterCompletionStatus } from '../model/encounterCompletion.model';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'xp-encounter-map',
  templateUrl: './encounters-tourist-view.component.html',
  styleUrls: ['./encounters-tourist-view.component.css']
})
export class EncountersTouristViewComponent implements OnInit {
  public pointsOfInterest: MarkerPosition[] = [];
  public markers: MarkerPosition[] = [];
  public allEncounters: Encounter[] = [];
  public startedEncounters: EncounterCompletion[] = [];
  public completedEncounters: EncounterCompletion[] = [];
  public failedEncounters: EncounterCompletion[] = [];
  showContent = 'showAll';
  @ViewChild(MapComponent) mapComponent: MapComponent | undefined;
  
  constructor(private service: EncountersService) { }

  ngOnInit(): void {
    this.getActiveEncounters();
    this.getTouristEncounterComletions();  
  }

  getActiveEncounters(): void {
    this.service.getEncountersByStatus('ACTIVE').subscribe({
      next: (result: PagedResults<Encounter>) => {
        this.allEncounters = result.results;  
        this.setMarkers(this.allEncounters);
        this.pointsOfInterest = this.markers;                    
      }
    });
  }

  getTouristEncounterComletions(): void {
    this.service.getEncounterCompletionsByUser().subscribe({
      next: (result: PagedResults<EncounterCompletion>) => {
        this.startedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.STARTED);
        this.completedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.COMPLETED);
        this.failedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.FAILED);
      }
    });
  }

  showTableAndSetMarkers(show: string): void {
    this.showContent = show;
    this.mapComponent?.clearMarkers();
    this.markers = [];
    
    switch (this.showContent) {
      case 'showStarted':
        this.setMarkers(this.startedEncounters);
        break;
      case 'showCompleted':
        this.setMarkers(this.completedEncounters);
        break;
      case 'showFailed':
        this.setMarkers(this.failedEncounters);
        break;
      default:
        this.setMarkers(this.allEncounters);
        break;
    }
    this.pointsOfInterest = this.markers;
  }

  setMarkers(encounters: any[]): void {
    encounters.forEach((obj) => {
      const encounter = (obj.encounter) ? obj.encounter : obj;
      this.markers.push({
        longitude: encounter.longitude,
        latitude: encounter.latitude,
        color: 'yellow',
        title: encounter.name
      });
    });
  
  }

}
