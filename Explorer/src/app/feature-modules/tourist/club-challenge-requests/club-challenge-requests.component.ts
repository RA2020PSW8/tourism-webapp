import { Component, Input } from '@angular/core';
import { ClubChallengeRequest } from '../model/club-challenge-request';
import { TouristService } from '../tourist.service';

@Component({
  selector: 'xp-club-challenge-requests',
  templateUrl: './club-challenge-requests.component.html',
  styleUrls: ['./club-challenge-requests.component.css']
})
export class ClubChallengeRequestsComponent {
  @Input() requests: ClubChallengeRequest[] | undefined = [];
  @Input() ownerPanel: Boolean = false;

  constructor(private touristService: TouristService){}

  acceptRequest(request: ClubChallengeRequest){
    if(window.confirm('Confirm that you want to accept challenge')){
      this.touristService.acceptChallenge(request).subscribe(res => {
        window.alert('Challenge accepted. The fight has begun');
      });
    }
  }

  declineRequest(request: ClubChallengeRequest){
    if(window.confirm('Confirm that you want to decline challenge')){
      this.touristService.declineChallenge(request).subscribe({
        next: (res) => {
          window.alert('Challenge accepted. The fight has begun');
          // TODO: Redirektovati na club fight panel
        },

        error: (err) => {
          window.alert(err);
        }
      });
    }
  }
}
