import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourReview } from './model/tour-review.model';
import { environment } from 'src/env/environment';
import { TouristPosition } from './model/tourist-position.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getTourReviews(): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(`${environment.apiHost}tourexecution/tourreview/`);
  }

  addTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.post<TourReview>(`${environment.apiHost}tourexecution/tourreview/`, tourreview);
  }

  updateTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.put<TourReview>(`${environment.apiHost}tourexecution/tourreview/` + tourreview.id, tourreview);
  }

  deleteTourReview(tourreview: TourReview): Observable<TourReview> {
    return this.http.delete<TourReview>(`${environment.apiHost}tourexecution/tourreview/` + tourreview.id);
  }

  getTouristPosition(): Observable<TouristPosition> {
    return this.http.get<TouristPosition>(`${environment.apiHost}tourist/position`);
  }

  addTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.post<TouristPosition>(`${environment.apiHost}tourist/position`, touristPosition);
  }

  updateTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.put<TouristPosition>(`${environment.apiHost}tourist/position`, touristPosition);
  }
}
