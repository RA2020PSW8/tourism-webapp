import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Tour} from "../../../tour-authoring/model/tour.model";


@Component({
  selector: 'xp-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css']
})
export class TourManagementComponent {
  @Input() availableTours: Tour[];
  @Input() selectedTours: Tour[];
  @Output() tourAdded = new EventEmitter<Tour>();
  @Output() tourRemoved = new EventEmitter<Tour>();
}
