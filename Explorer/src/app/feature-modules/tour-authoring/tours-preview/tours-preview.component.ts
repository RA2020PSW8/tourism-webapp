import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour.model';

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
        description: 'This is a tour',
        name: 'Tour 1'
      },
      {
        id: 2,
        description: 'This is another tour',
        name: 'Tour 2'
      },
      {
        id: 3,
        description: 'This is a third tour',
        name: 'Tour 3'
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
