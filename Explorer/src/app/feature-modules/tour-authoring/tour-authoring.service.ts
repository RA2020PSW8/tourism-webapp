import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Keypoint } from './model/keypoint.model';
import { environment } from 'src/env/environment';
import { Equipment } from '../administration/model/equipment.model';
import { TourEquipment } from './model/tour_equipment';

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
}
