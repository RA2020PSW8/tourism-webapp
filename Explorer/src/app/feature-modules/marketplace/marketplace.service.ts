import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourPreference } from './model/tour-preference.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResult } from '../tour-execution/shared/model/paged-result.model';
import { Tour } from '../tour-authoring/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private readonly apiUrl = `${environment.apiHost}tourist`;
  private readonly tourApiUrl = `${environment.apiHost}marketplace/tours`;

  constructor(private http: HttpClient) { }

  getTourPreference(): Observable<TourPreference> {
    return this.http.get<TourPreference>(`${this.apiUrl}/tourPreference`)
  }

  deleteTourPreference(): Observable<TourPreference> {
    return this.http.delete<TourPreference>(`${this.apiUrl}/tourPreference`);
  }

  addTourPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(`${this.apiUrl}/tourPreference`, tourPreference);
  }

  updateTourPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(`${this.apiUrl}/tourPreference`, tourPreference);
  }

  /* Tour */
  getPublishedTours(): Observable<PagedResult<Tour>>{
    return this.http.get<PagedResult<Tour>>(`${this.tourApiUrl}`);
  }
}
