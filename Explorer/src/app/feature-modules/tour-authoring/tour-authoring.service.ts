import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Keypoint } from './model/keypoint.model';
import { environment } from 'src/env/environment';
import { Object } from './model/object.model';

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

  getObjects() : Observable<PagedResults<Object>>{
    return this.http.get<PagedResults<Object>>(`${this.apiUrl}/objects`);
  }

  deleteObject(id: number): Observable<Object>{
    return this.http.delete<Object>(`${this.apiUrl}/objects/${id}`);
  }

  addObject(newObject: Object): Observable<Object>{
    return this.http.post<Object>(`${this.apiUrl}/objects`, newObject);
  }

  updateObject(updatedObject: Object): Observable<Object>{
    return this.http.put<Object>(`${this.apiUrl}/objects/${updatedObject.id}`, updatedObject);
  }
}
