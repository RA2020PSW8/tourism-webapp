import { Component, OnInit } from '@angular/core';
import { TouristPosition } from '../model/tourist-position.model';
import { TourExecutionService } from '../tour-execution.service';
import { MarkerPosition } from 'src/app/shared/model/markerPosition.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'xp-tourist-position',
  templateUrl: './tourist-position.component.html',
  styleUrls: ['./tourist-position.component.css'],
  providers: [MessageService],
})
export class TouristPositionComponent implements OnInit {
  public touristPosition: TouristPosition;
  public mode: string = 'add';
  public touristMapPosition: MarkerPosition;

  constructor(
    private service: TourExecutionService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition(): void {
    this.service.getTouristPosition().subscribe({
      next: (result: TouristPosition) => {
        this.touristPosition = result;
        this.touristMapPosition = {
          latitude: this.touristPosition.latitude,
          longitude: this.touristPosition.longitude,
        };
        this.mode = 'edit';
      },
      error: () => {
        this.mode = 'add';
      },
    });
  }

  updateTouristPosition(event: number[]): void {
    this.touristPosition = {
      latitude: event[0],
      longitude: event[1],
    };
  }

  confirmPosition(): void {
    if (this.touristPosition == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Please select your position',
      });
      return;
    }

    if (this.mode === 'edit') {
      this.service.updateTouristPosition(this.touristPosition).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Position successfully updated',
          });
          this.service.updateSocialEncounters().subscribe({
            next: () => {},
          });
        },
      });
    } else if (this.mode === 'add') {
      this.service.addTouristPosition(this.touristPosition).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Position successfully added',
          });
          this.mode = 'edit';

          this.service.updateSocialEncounters().subscribe({
            next: () => {},
          });
        },
      });
    }
  }
}
