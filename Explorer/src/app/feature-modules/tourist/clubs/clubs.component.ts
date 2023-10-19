import { Component, OnInit } from '@angular/core';
import {Club} from '../model/clubs.model'
import { TouristService } from '../tourist.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{

  
  clubs: Club[] =  []; 

  constructor(private service: TouristService) {


  
  }
  ngOnInit(): void {

    this.getClubs(); 
    
  }
  getClubs(): void{

    this.service.getClubs().subscribe({
      next: (result:PagedResults<Club>) => {
        this.clubs = result.results;
         
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
  }
   

}
