import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourPreference } from './model/tour-preference.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getTourPreference(id: number): Observable<TourPreference> {
    return this.http.get<TourPreference>(environment.apiHost + 'tourist/tourPreference/' + id)
  }

  deleteTourPreference(id: number): Observable<TourPreference> {
    return this.http.delete<TourPreference>(environment.apiHost + 'tourist/tourPreference/' + id);
  }

  addTourPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(environment.apiHost + 'tourist/tourPreference', tourPreference);
  }

  updateTourPreference(id: number, tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(environment.apiHost + 'tourist/tourPreference/' + id, tourPreference);
  }
}
