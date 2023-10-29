import { Component, Input, OnInit } from '@angular/core';
import { Keypoint } from '../model/keypoint.model';
import { TourAuthoringService } from '../tour-authoring.service';

@Component({
  selector: 'xp-keypoint',
  templateUrl: './keypoint.component.html',
  styleUrls: ['./keypoint.component.css']
})
export class KeypointComponent implements OnInit{

  @Input() keypoints : Keypoint[];
  public selectedKeypoint: Keypoint;

  constructor(private tourAuthoringService: TourAuthoringService){}

  ngOnInit(): void {
    
  }

  deleteKeypoint(id: number): void{
    if(window.confirm('Are you sure that you want to delete this keypoint?')){
      // this.tourAuthoringService.deleteKeypoint(id).subscribe({
      //   next: () => {
      //     this.getKeypoints();
      //   },
      //   error: () => {
          
      //   }
      // });
    }
  }

  onEditClicked(keypoint: Keypoint): void{

  }

  onAddClicked(): void{

  }
}
