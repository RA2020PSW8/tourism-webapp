import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Keypoint } from './model/keypoint.model';
import { environment } from 'src/env/environment';
import { Object } from './model/object.model';
import { Equipment } from '../administration/model/equipment.model';
import { TourEquipment } from './model/tour_equipment';
import { Tour } from './model/tour.model';

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
  
  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'administration/equipment')
  }

  addEquipmentToTour(tourEquipment: TourEquipment): Observable<TourEquipment> {
    return this.http.post<TourEquipment>(`${this.apiUrl}/tour-equipment/add`, tourEquipment);
  }

  getEquipmentForTour(tourId: number): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(`${this.apiUrl}/tour-equipment/${tourId}`);
  }

  removeEquipmentFromTour(tourEquipment: TourEquipment): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tour-equipment/remove`, tourEquipment);
  }
  
  getTours() : Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(`${this.apiUrl}/tours`);
  }

  getTourById(tourId: number): Observable<Tour>{
    return this.http.get<Tour>(`${this.apiUrl}/tours/${tourId}`);
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
