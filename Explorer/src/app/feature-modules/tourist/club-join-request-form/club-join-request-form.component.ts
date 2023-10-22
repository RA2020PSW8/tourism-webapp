import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TouristService } from '../tourist.service';

@Component({
  selector: 'xp-club-join-request-form',
  templateUrl: './club-join-request-form.component.html',
  styleUrls: ['./club-join-request-form.component.css']
})
export class ClubJoinRequestFormComponent {
  public clubJoinRequestForm: FormGroup;

  constructor(private touristService: TouristService) {
    this.clubJoinRequestForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });
  }
}
