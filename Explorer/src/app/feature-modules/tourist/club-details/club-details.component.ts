import { Component, OnInit } from '@angular/core';
import { TouristService } from '../tourist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Club } from '../model/club.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ClubChallengeRequest } from '../model/club-challenge-request';

@Component({
  selector: 'xp-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit{

  public user: User | undefined;
  public clubId: number;
  public club: Club = {} as Club;
  public selectedTab: string = 'members';
  public requests: ClubChallengeRequest[] = [];

  constructor(private touristService: TouristService, private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.clubId = Number(params.get('id'));

      if(this.clubId !== 0){
        this.touristService.updateFights().subscribe({
          next: () => {
            this.touristService.getClubById(this.clubId).subscribe((res: Club) => {
              this.club = res;
    
              this.touristService.getClubChallenges(this.clubId).subscribe(res => {
                this.requests = res;
              });
            });
          },
          error: () => {
            this.touristService.getClubById(this.clubId).subscribe((res: Club) => {
              this.club = res;
    
              this.touristService.getClubChallenges(this.clubId).subscribe(res => {
                this.requests = res;
              });
            });
          }
        });
      }
    });
  }

  public switchTab(tab: string): void{
    this.selectedTab = tab;
  }
}
