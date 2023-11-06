import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private readonly filterApiUrl = `${environment.apiHost}marketplace/tours/filter`

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

  getFilteredTours(page: number,pageSize: number, currentLatitude: number, currentLongitude: number,filterRadius: number): Observable<PagedResult<Tour>>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('CurrentLatitude', currentLatitude.toString())
    .set('CurrentLongitude', currentLongitude.toString())
    .set('FilterRadius', filterRadius.toString());
    return this.http.get<PagedResult<Tour>>(`${this.filterApiUrl}`, {params})
  }
}
