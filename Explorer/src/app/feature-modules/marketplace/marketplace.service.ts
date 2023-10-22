import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourPreference } from './model/tour-preference.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private readonly apiUrl = `${environment.apiHost}tourist`;

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
}
