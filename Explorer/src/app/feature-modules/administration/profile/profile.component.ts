import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';



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
    constructor(private service: ProfileService, private auth:AuthService){}

    ngOnInit(): void {
      this.auth.user$.subscribe((user) => {
        if (user.username) {
          // If a user is authenticated, get the user's ID
          const userId = user.id-6;
  
          // Fetch the user's profile using the ID
          this.service.getProfile(userId).subscribe({
            next: (data: Profile) => {
              this.profile.name = data.name;
              this.profile.surname = data.surname;
              this.profile.profileImage = data.profileImage;
              this.profile.biography = data.biography;
              this.profile.quote = data.quote;
            },
            error: (err: any) => {
              console.log(err);
            }
          });
        }
      });
     
    }
          
          
   
}
