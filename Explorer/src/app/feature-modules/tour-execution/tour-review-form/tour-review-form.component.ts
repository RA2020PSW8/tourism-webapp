import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourExecutionService } from '../tour-execution.service';
import { TourReview } from '../model/tour-review.model';
import { TourReviewString } from '../model/tour-review-string.model';

@Component({
  selector: 'xp-tour-review-form',
  templateUrl: './tour-review-form.component.html',
  styleUrls: ['./tour-review-form.component.css']
})
export class TourReviewFormComponent implements OnChanges {

  @Output() tourReviewUpdated = new EventEmitter<null>(); 
  @Input() tourReview: TourReview;
  @Input() shouldEdit: boolean = false;

  constructor(private service: TourExecutionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.tourReviewForm.reset();
    if(this.shouldEdit) {
      this.tourReviewForm.patchValue(this.tourReview);
    }
  }

  tourReviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    visitDate: new FormControl('', [Validators.required]),
    imageLinks: new FormControl('', [Validators.required])
  })

  addTourReview(): void {
  
    const tourReview: TourReviewString = {
      rating: Number(this.tourReviewForm.value.rating),
      comment: this.tourReviewForm.value.comment || "",
      visitDate: new Date(this.tourReviewForm.value.visitDate as string).toISOString().toString(),
      ratingDate: new Date().toISOString(),
      imageLinks: this.tourReviewForm.value.imageLinks?.split('\n') as string[]
    }
    
    this.clearFormFields();

    this.service.addTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit();
        alert('Successfully added tour review!');
      }
    });
  }

  updateTourReview(): void {
    const tourReview: TourReviewString = {
      rating: Number(this.tourReviewForm.value.rating),
      comment: this.tourReviewForm.value.comment || "",
      visitDate: new Date(this.tourReviewForm.value.visitDate as string).toISOString().toString(),
      ratingDate: new Date().toISOString(),
      imageLinks: this.tourReviewForm.value.imageLinks as unknown as string[]
    }

    tourReview.id = this.tourReview.id;
    this.clearFormFields();

    this.service.updateTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit();
        alert('Successfully updated tour review!');
      }
    });
  }

  clearFormFields(): void {
    this.tourReviewForm.value.rating = "";
    this.tourReviewForm.value.comment = "";
    this.tourReviewForm.value.visitDate = "";
    this.tourReviewForm.value.imageLinks = "";
  }

}
