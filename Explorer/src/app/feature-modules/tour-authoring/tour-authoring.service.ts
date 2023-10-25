import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Keypoint } from './model/keypoint.model';
import { environment } from 'src/env/environment';
import { Tour } from './model/tour.model'

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  private readonly apiUrl = `${environment.apiHost}author`;

  constructor(private http: HttpClient) { }

  getKeypoints(): Observable<PagedResults<Keypoint>>{
    return this.http.get<PagedResults<Keypoint>>(`${this.apiUrl}/keypoints`);
  }

  deleteKeypoint(id: number): Observable<Keypoint>{
    return this.http.delete<Keypoint>(`${this.apiUrl}/keypoints/${id}`);
  }

  addKeypoint(newKeypoint: Keypoint): Observable<Keypoint>{
    return this.http.post<Keypoint>(`${this.apiUrl}/keypoints`, newKeypoint);
  }

  updateKeypoint(updatedKeypoint: Keypoint): Observable<Keypoint>{
    return this.http.put<Keypoint>(`${this.apiUrl}/keypoints/${updatedKeypoint.id}`, updatedKeypoint);
  }

  getTours() : Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(`${this.apiUrl}/tours`);
  }

  deleteTour(id: number): Observable<Tour>{
    return this.http.delete<Tour>(`${this.apiUrl}/tours/${id}`);
  }

  addTour(newTour: Tour): Observable<Tour>{
    return this.http.post<Tour>(`${this.apiUrl}/tours/`, newTour);
  }

  updateTour(updatedTour: Tour): Observable<Tour>{
    return this.http.put<Tour>(`${this.apiUrl}/tours/${updatedTour.id}`, updatedTour);
  }

}
