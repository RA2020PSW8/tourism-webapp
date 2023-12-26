import { Component, OnInit } from '@angular/core';
import { TouristService } from '../tourist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Club } from '../model/club.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

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

  constructor(private touristService: TouristService, private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.clubId = Number(params.get('id'));

      if(this.clubId !== 0){
        this.touristService.getClubById(this.clubId).subscribe((res: Club) => {
          this.club = res;
        });
      }
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
