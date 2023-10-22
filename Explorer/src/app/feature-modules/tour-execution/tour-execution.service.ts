import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourReview } from './model/tour-review.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getTourReviews(): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>('https://localhost:44333/api/tourexecution/tourreview');
  }

  addTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.post<TourReview>('https://localhost:44333/api/tourexecution/tourreview', tourreview);
  }

  updateTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.put<TourReview>('https://localhost:44333/api/tourexecution/tourreview/' + tourreview.id, tourreview);
  }

  deleteTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.delete<TourReview>('https://localhost:44333/api/tourexecution/tourreview/' + tourreview.id);
  }
}
