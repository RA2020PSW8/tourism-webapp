import { Component, OnInit } from '@angular/core';
import { Keypoint } from '../model/keypoint.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-keypoint',
  templateUrl: './keypoint.component.html',
  styleUrls: ['./keypoint.component.css']
})
export class KeypointComponent implements OnInit{

  public keypoints : Keypoint[];
  public selectedKeypoint: Keypoint;
  public mode : string = 'add';
  public renderKeypointForm: boolean = false;

  constructor(private tourAuthoringService: TourAuthoringService){}

  ngOnInit(): void {
    this.getKeypoints(); 
  }

  deleteKeypoint(id: number): void{
    if(window.confirm('Are you sure that you want to delete this keypoint?')){
      this.tourAuthoringService.deleteKeypoint(id).subscribe({
        next: () => {
          this.getKeypoints();
        },
        error: () => {
          
        }
      });
    }
  }

  onEditClicked(keypoint: Keypoint): void{
    this.selectedKeypoint = keypoint;
    console.log(this.selectedKeypoint);
    this.mode = 'edit';
    this.renderKeypointForm = true;
  }

  onAddClicked(): void{
    this.mode = 'add';
    this.renderKeypointForm = true;
  }

  getKeypoints(): void{
    this.tourAuthoringService.getKeypoints().subscribe({
      next: (response: PagedResults<Keypoint>) => {
        this.keypoints = response.results;
      },
      error: () => {
        
      }
    });
  }
}
