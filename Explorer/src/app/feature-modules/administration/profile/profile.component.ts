import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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
export class ProfileComponent implements OnInit{

  personUpdateForm: FormGroup;

    profile : Profile = {
      name: '',
      surname: '',
      profileImage: '',
      biography: '',
      quote: '',
      username: '',
      password: '',
      email: '',
      userId:0
    }
    constructor(private cd:ChangeDetectorRef,private service: ProfileService, private auth:AuthService, private formBuilder :FormBuilder){
      this.personUpdateForm = this.formBuilder.group({
        newName: '',
        newSurname: '',
        newProfileImage: '',
        newBiography: '',
        newQuote: '',
        username:'', 
        password:'',
        email:''
      });
    }

    ngOnInit(): void {
      this.loadProfileData();
    }

   
    loadProfileData(){
      this.auth.user$.subscribe((user) => {
        if (user.username) {
         
          const userId = user.id-6;
  
          
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
    onSubmit() {
      if (this.personUpdateForm.valid) {
       
        this.auth.user$.subscribe((user) => {
          if (user.username) {
            
            const userId = user.id - 6;
    
            alert(JSON.stringify(userId))
            const updatedProfile: Profile = {
              name: this.personUpdateForm.value.newName,
              surname: this.personUpdateForm.value.newSurname,
              profileImage: this.personUpdateForm.value.newProfileImage,
              biography: this.personUpdateForm.value.newBiography,
              quote: this.personUpdateForm.value.newQuote,
              username: this.personUpdateForm.value.username,
              password: this.personUpdateForm.value.password,
              email: this.personUpdateForm.value.email,
              userId: user.id
              
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
