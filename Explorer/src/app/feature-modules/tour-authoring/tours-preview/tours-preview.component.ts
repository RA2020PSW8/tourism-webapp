import { Component, OnInit } from '@angular/core';
import { Status, Tour, TourDifficulty, TransportType } from '../model/tour.model';

@Component({
  selector: 'xp-tours-preview',
  templateUrl: './tours-preview.component.html',
  styleUrls: ['./tours-preview.component.css']
})
export class ToursPreviewComponent implements OnInit{
  public tours: Tour[] = [];
  public renderTourEquipment: boolean = false;
  public selectedTour: Tour;

  ngOnInit(): void {
    this.getTours();
  }
  
  
  getTours(): void {
    this.tours = [
      {
        id: 1,
        userId: 1,
        name: 'Tour 1',
        description: 'This is a tour',
        price: 50,
        difficulty: TourDifficulty.EASY,
        transportType: TransportType.WALK,
        status: Status.DRAFT,
        tags: []
      },
      {
        id: 2,
        userId: 2,
        name: 'Tour 2',
        description: 'This is another tour',
        price: 75,
        difficulty: TourDifficulty.MEDIUM,
        transportType: TransportType.BIKE,
        status: Status.DRAFT,
        tags: []
      },
      {
        id: 3,
        userId: 3,
        name: 'Tour 3',
        description: 'This is a third tour',
        price: 100,
        difficulty: TourDifficulty.HARD,
        transportType: TransportType.CAR,
        status: Status.DRAFT,
        tags: []
      }
    ];
  }

  onEditClicked(tour: Tour): void{
    this.selectedTour = tour;
    console.log(this.selectedTour);
    //this.mode = 'edit';
    this.renderTourEquipment = true;
  }

}
