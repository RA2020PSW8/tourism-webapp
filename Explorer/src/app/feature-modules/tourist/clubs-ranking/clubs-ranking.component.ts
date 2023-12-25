import { Component, OnInit } from '@angular/core';
import { Club, ClubUpdatedModel } from '../model/club.model';
import { TouristService } from '../tourist.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-clubs-ranking',
  templateUrl: './clubs-ranking.component.html',
  styleUrls: ['./clubs-ranking.component.css']
})
export class ClubsRankingComponent implements OnInit{

  clubs: ClubUpdatedModel[] =  [];  

  constructor(private service: TouristService) {}

  ngOnInit(): void {
    this.getClubs(); 
  }
  
  getClubs(): void{

    this.service.getClubsUpdatedModel().subscribe({
      next:(result:PagedResults<ClubUpdatedModel>) => {
        this.clubs = result.results;
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
  }

}
