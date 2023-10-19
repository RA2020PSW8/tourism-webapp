import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { TouristService } from '../tourist.service';
import { Club } from '../model/clubs.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Output } from '@angular/core';

@Component({
  selector: 'xp-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent {

  @Output() clubUpdated = new EventEmitter<null>(); 

  clubForm = new FormGroup({

    name: new FormControl('',[Validators.required]),

    description: new FormControl('') 

  });

  constructor(private service: TouristService, private authService: AuthService) {}

 
 
  addClub(): void{
   
    const club: Club = { 
      name: this.clubForm.value.name || "", 
      description: this.clubForm.value.description || "",  
      userId: this.authService.user$.value.id
    } 
    
    this.service.addClub(club).subscribe({
      next: (_) => {
        this.clubUpdated.emit()
      }

    });

  } 
}
