import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';

import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';



@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

    profile : Profile = {
      name: '',
      surname: '',
      profileImage: '',
      biography: '',
      quote: '',
    }
    constructor(private service: ProfileService){}

    ngOnInit(): void {
          //alert(JSON.stringify(this.profile));
          const userId = 1
      

          /*
          this.service.getProfile(userId).subscribe(
            (data) => {
              //alert(JSON.stringify(data))
              this.profile.name = data.results[0].name;
              console.log(data)
              this.profile.surname = data.results[0].surname;
              this.profile.biography = data.results[0].biography;
              this.profile.profileImage = data.results[0].profileImage;
              this.profile.quote = data.results[0].quote;
            }
          )
          */
         this.service.getProfile(userId).subscribe({
          next: (data:Profile) => {
            this.profile.name = data.name;
            this.profile.surname = data.surname
            this.profile.profileImage = data.profileImage;
            this.profile.biography = data.biography;
            this.profile.quote = data.quote;
            
          },
          error: (err: any) => {
            console.log(err)
          }
         })
          //alert(JSON.stringify(this.profile))
        
    }
}
