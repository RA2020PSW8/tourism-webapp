import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showContent = 'showProfile';
  profilesToFollow: Profile[] = [];
  personUpdateForm: FormGroup;
  followers: Profile[];
  following: Profile[];

  profile: Profile = {
    name: '',
    surname: '',
    profileImage: '',
    biography: '',
    quote: '',
    username: '',
    password: '',
    email: '',
    userId: 0,
  }
  constructor(private cd: ChangeDetectorRef, private service: ProfileService, private auth: AuthService, private formBuilder: FormBuilder) {
    this.personUpdateForm = this.formBuilder.group({
      newName: new FormControl('', Validators.required),
      newSurname: new FormControl('', Validators.required),
      newProfileImage: new FormControl('', Validators.required),
      newBiography: new FormControl('', Validators.required),
      newQuote: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      userId: 0

    });
  }

  ngOnInit(): void {
    this.loadProfileData();
    this.loadProfileFollowers();
    this.loadProfileFollowing();
    this.getProfiles();
  }


  loadProfileData() {
    this.auth.user$.subscribe((user) => {
      if (user.username) {


        const userId = user.id;


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
  loadProfileFollowers() {
    this.auth.user$.subscribe((user) => {
      if (user.username) {
        const userId = user.id;

        this.service.getFollowers(userId).subscribe({
          next: (data: PagedResults<Profile>) => {
            this.followers = data.results;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });
  }
  loadProfileFollowing() {
    this.auth.user$.subscribe((user) => {
      if (user.username) {
        const userId = user.id;

        this.service.getFollowing(userId).subscribe({
          next: (data: PagedResults<Profile>) => {
            this.following = data.results;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });
  }
  getProfiles(): void{

    this.service.getProfiles().subscribe({
      next: (data: PagedResults<Profile>) => {
        this.profilesToFollow = data.results;  
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
  }
  showTable(show: string): void {
    this.showContent = show;
  }
  unfollow(following: Profile) {
    this.auth.user$.subscribe((user) => {
      this.service.unfollow(following).subscribe({
        next: (data:PagedResults<Profile>) => {
          this.following = data.results
          this.getProfiles();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    })
  }
  follow(following: Profile) {
    this.auth.user$.subscribe((user) => {
      this.service.follow(following).subscribe({
        next: (data:PagedResults<Profile>) => {
          this.following = data.results
          this.getProfiles();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    })
  }
  onSubmit() {
    if (this.personUpdateForm.valid) {

      this.auth.user$.subscribe((user) => {
        if (user.username) {



          const userId = user.id;

          const updatedProfile: Profile = {
            name: this.personUpdateForm.value.newName,
            surname: this.personUpdateForm.value.newSurname,
            profileImage: this.personUpdateForm.value.newProfileImage,
            biography: this.personUpdateForm.value.newBiography,
            quote: this.personUpdateForm.value.newQuote,
            username: this.personUpdateForm.value.username,
            password: this.personUpdateForm.value.password,
            email: this.personUpdateForm.value.email,
            userId: user.id,
          };


          this.service.updateProfile(userId, updatedProfile).subscribe({
            next: (data: Profile) => {
              this.personUpdateForm.reset();
              this.loadProfileData();
              this.cd.detectChanges();
            },
            error: (err: any) => {
              console.log(err);
            }
          });
        }
      });
    }
  }


}
