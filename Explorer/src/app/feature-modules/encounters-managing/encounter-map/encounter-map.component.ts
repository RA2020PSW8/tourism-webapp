import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../encounters.service';
import { Encounter } from '../encounters-preview/model/encounter.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';

@Component({
  selector: 'xp-encounter-map',
  templateUrl: './encounter-map.component.html',
  styleUrls: ['./encounter-map.component.css']
})
export class EncounterMapComponent implements OnInit {
  public pointsOfInterest: MarkerPosition[] = [];
  public temporary: MarkerPosition[] = [];

  constructor(private service: EncountersService) { }

  ngOnInit(): void {
    this.getActiveEncounters();
  }

  getActiveEncounters(): void {
    this.service.getEncountersByStatus('ACTIVE').subscribe({
      next: (result: PagedResults<Encounter>) => {
        result.results.forEach((obj) => {
          this.temporary.push({
            longitude: obj.longitude,
            latitude: obj.latitude,
            color: 'yellow',
            title: obj.name
          })
        });
        this.pointsOfInterest = this.temporary;
      }
    });
  }
}
