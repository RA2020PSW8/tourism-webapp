import { Component, OnInit } from '@angular/core';
import { Object } from '../model/object.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit{

    objects: Object[] = [];
    selectedObject: Object;
    mode : string = 'add';
    renderObject: boolean = false;

    constructor(private tourAuthoringService: TourAuthoringService){}

    ngOnInit(): void{
      this.getObjects();
    }

    deleteObject(id: number): void{
      if(window.confirm('Are you sure that you want to delete this object?')){
        this.tourAuthoringService.deleteObject(id).subscribe({
          next: () => {
            this.getObjects();
          },
          error: () => {
            
          }
        });
      }
    }

    onEditClicked(object: Object):void{
      this.selectedObject = object;
      console.log(this.selectedObject);
      this.mode = 'edit';
      this.renderObject = true;
    }

    onAddClicked(): void{
      this.mode = 'add';
      this.renderObject = true;
    }
    

    getObjects(): void{
      this.tourAuthoringService.getObjects().subscribe({
        next: (response: PagedResults<Object>) => {
          this.objects = response.results;
        },
        error: () => {
          
        }
      });
    }
    

}
