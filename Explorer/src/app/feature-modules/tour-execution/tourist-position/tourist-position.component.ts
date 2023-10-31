import { Component, OnInit } from '@angular/core';
import { TouristPosition } from '../model/tourist-position.model';
import { TourExecutionService } from '../tour-execution.service';

@Component({
  selector: 'xp-tourist-position',
  templateUrl: './tourist-position.component.html',
  styleUrls: ['./tourist-position.component.css']
})
export class TouristPositionComponent implements OnInit {
  
  public touristPosition: TouristPosition;
  public mode: string = 'add';

  constructor(private service: TourExecutionService) { }

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition(): void {
    this.service.getTouristPosition().subscribe({
      next: (result: TouristPosition) => { 
        this.touristPosition = result;
        this.mode = 'edit';
      },
      error: () => { 
        console.log("error");
        this.mode = 'add';
      }
    });
  }

  confirmPosition(): void {
    if (this.mode === 'edit' ) {
      this.service.updateTouristPosition(this.touristPosition).subscribe();
    }
    else if (this.mode ==='add') {
      this.touristPosition = {
        userId: 0,
        latitude: 20,
        longitude: 30,
        updatedAt: new Date()
      }
      this.service.addTouristPosition(this.touristPosition).subscribe();
    }
  }
}
