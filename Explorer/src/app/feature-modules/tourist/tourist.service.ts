import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Equipment } from '../administration/model/equipment.model';
import { EquipmentForSelection } from './model/eqipment-for-selection.model';
import { TouristEquipment } from './model/tourist-equipment.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor(private http: HttpClient) { }

  getEquipmentForSelection(): Observable<EquipmentForSelection[]> {
    return this.http.get<EquipmentForSelection[]>(environment.apiHost + 'administration/equipment/forSelected/1') //logged
  }

  addSelectionEquipment(touristEquipment : TouristEquipment): Observable<TouristEquipment> {
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment', touristEquipment) 
  }
  

  
}
