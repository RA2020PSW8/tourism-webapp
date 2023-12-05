import { Component, OnInit, ViewChild } from '@angular/core';
import { EncountersService } from '../encounters.service';
import { Encounter } from '../model/encounter.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { EncounterCompletion, EncounterCompletionStatus } from '../model/encounterCompletion.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Profile } from '../../administration/model/profile.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

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
  public touristEncounters: Encounter[] = [];
  public showContent = 'showAll';
  public selectedEncounter: Encounter;
  public showForm: boolean;
  public formMode: string;
  public canCreateEncounters: boolean = false;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  
  constructor(private service: EncountersService) { }

  ngOnInit(): void {
    this.getActiveEncounters(); 
    this.getTouristEncounterCompletions();    
    this.getTouristEncounters();
    this.canTouristCreateEncounters();
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

  getTouristEncounterCompletions(): void {
    this.service.getEncounterCompletionsByUser().subscribe({
      next: (result: PagedResults<EncounterCompletion>) => {
        this.startedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.STARTED);
        this.completedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.COMPLETED);
        this.failedEncounters = result.results.filter(c => c.status === EncounterCompletionStatus.FAILED);
      }
    });
  }

  getTouristEncounters(): void {
    this.service.getEncountersByUser().subscribe({
      next: (result: PagedResults<Encounter>) => {
        this.touristEncounters = result.results;  
        this.setMarkers(this.touristEncounters);
        this.pointsOfInterest = this.markers;                    
      }
    });
  }

  canTouristCreateEncounters(): void {
    this.service.canTouristCreateEncouters().subscribe({
      next: (result: boolean) => {
        this.canCreateEncounters = result;                
      }
    });
  }

  showTableAndSetMarkers(show: string): void {
    this.showContent = show;
    this.mapComponent.clearMarkers();
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
      case 'showMy':
          this.setMarkers(this.touristEncounters);
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

  addEncounter(): void {
    this.showForm = true;
    this.formMode = 'add';
  }

  selectEncounterForUpdate(encounter: Encounter): void {
    this.selectedEncounter = encounter;
    this.formMode = 'edit';
    this.showForm = true;
  }

  deleteEncounter(id: number): void{
    if(window.confirm('Are you sure that you want to delete this encounter?')){
      this.service.deleteEncounter(id).subscribe({
        next: () => {
          this.getTouristEncounters();  
          this.getActiveEncounters();
          this.getTouristEncounterCompletions();
        },
        error: () => {
          
        }
      });
    }
  }

  encounterUpdated(): void {
    this.getTouristEncounters();
    this.getActiveEncounters();
    this.getTouristEncounterCompletions();
    this.showForm = false;
  }
}
