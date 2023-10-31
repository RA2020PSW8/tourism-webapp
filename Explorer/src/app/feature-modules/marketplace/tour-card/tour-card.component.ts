import { Component, Input } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent {

  @Input() tour: Tour;

  constructor(){}
}
