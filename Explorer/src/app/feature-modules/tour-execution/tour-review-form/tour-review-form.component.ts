import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourExecutionService } from '../tour-execution.service';
import { TourReview } from '../model/tour-review.model';
import { TourReviewString } from '../model/tour-review-string.model';
import { Tour } from '../../tour-authoring/model/tour.model';

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
      const tourReviewString: TourReviewString = {
        id: this.tourReview.id?.toString(),
        rating: this.tourReview.rating.toString(),
        comment: this.tourReview.comment,
        visitDate: this.tourReview.visitDate.toString(),
        ratingDate: this.tourReview.ratingDate.toString(),
        imageLinks: this.tourReview.imageLinks.toString() || "",
        tourId: this.tourReview.tourId.toString(),
        userId: this.tourReview.userId.toString()
      };
      this.tourReviewForm.patchValue(tourReviewString);
    }
  }

  tourReviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    visitDate: new FormControl('', [Validators.required]),
    ratingDate: new FormControl('', [Validators.required]),
    imageLinks: new FormControl('', [Validators.required]),
  })

  addTourReview(): void {
  
    const tourReview: TourReview = {
      rating: Number(this.tourReviewForm.value.rating),
      comment: this.tourReviewForm.value.comment || "",
      visitDate: new Date(this.tourReviewForm.value.visitDate as string),
      ratingDate: new Date(this.tourReviewForm.value.ratingDate as string),
      imageLinks: this.tourReviewForm.value.imageLinks?.split(' ') || [],
      tourId: 1,
      userId: parseInt(localStorage.getItem('loggedId')??'1')
    }
    
    console.log(tourReview);

    this.service.addTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit()
      }
    });
  }

  updateTourReview(): void {
    const tourReview: TourReview = {
      rating: Number(this.tourReviewForm.value.rating),
      comment: this.tourReviewForm.value.comment || "",
      visitDate: new Date(this.tourReviewForm.value.visitDate as string),
      ratingDate: new Date(this.tourReviewForm.value.ratingDate as string),
      imageLinks: this.tourReviewForm.value.imageLinks?.split(' ') || [],
      tourId: 1,
      userId: parseInt(localStorage.getItem('loggedId')??'1')
    }
    tourReview.id = this.tourReview.id;

    this.service.updateTourReview(tourReview).subscribe({
      next: (_) => {
        this.tourReviewUpdated.emit()
      }
    });
  }
}
