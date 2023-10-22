import { Component, OnInit } from '@angular/core';
import {Club} from '../model/clubs.model'
import { TouristService } from '../tourist.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{

  
  clubs: Club[] =  []; 
  selectedClub : Club; 
  shouldEdit = false; 
  shouldRenderClubForm = false; 
  loggedId: number; 

  constructor(private service: TouristService, private authService: AuthService) {


  
  }
  ngOnInit(): void {

    this.getClubs(); 
    this.loggedId = this.authService.user$.value.id; 
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

  onEditClicked(club: Club): void {
    this.selectedClub = club; 
    this.shouldRenderClubForm = true;
    this.shouldEdit = true;
  }
   
  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderClubForm = true;
  }

}