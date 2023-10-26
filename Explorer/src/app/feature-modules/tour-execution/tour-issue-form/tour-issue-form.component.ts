import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourIssueService } from '../tour-issue.service';
import { TourIssue } from '../model/tour-issue.model';
import { tourIssueString } from '../model/tour-issue-string.model';

@Component({
  selector: 'xp-tour-issue-form',
  templateUrl: './tour-issue-form.component.html',
  styleUrls: ['./tour-issue-form.component.css']
})
export class TourIssueFormComponent implements OnChanges {
  @Output() tourIssueUpdated = new EventEmitter<null>();
  @Input() selectedTourIssue: TourIssue;

  constructor(private service: TourIssueService) {}

  tourIssueForm = new FormGroup({
    category: new FormControl('', Validators.required),
    priority: new FormControl(''),
    description: new FormControl('', Validators.required),
    dateTime: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges): void {
    const tourIssueString: tourIssueString = {
      id: this.selectedTourIssue.id,
      category: this.selectedTourIssue.category,
      priority: this.selectedTourIssue.priority.toString(),
      description: this.selectedTourIssue.description,
      dateTime: this.selectedTourIssue.dateTime.toString()
    };

    this.tourIssueForm.patchValue(tourIssueString);
  }

  addTourIssue(): void {
    const tourIssue : TourIssue = {
      category: this.tourIssueForm.value.category || "",
      priority: Number(this.tourIssueForm.value.priority) || 1,
      description: this.tourIssueForm.value.description || "",
      dateTime: new Date(this.tourIssueForm.value.dateTime as string)
    }

    this.service.addTourIssue(tourIssue).subscribe({
      next: (_) => {
        this.tourIssueUpdated.emit();
      }
    });
  }

  updateTourIssue(): void {
    const tourIssue : TourIssue = {
      id: this.selectedTourIssue.id,
      category: this.tourIssueForm.value.category as string,
      priority: Number(this.tourIssueForm.value.priority),
      description: this.tourIssueForm.value.description as string,
      dateTime: new Date(this.tourIssueForm.value.dateTime as string)
    }
    this.service.updateTourIssue(tourIssue).subscribe({
      next: (_) => {
        this.tourIssueUpdated.emit();
      }
    });
  }
}
