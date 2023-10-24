import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { User } from './model/user.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { PagedResult } from '../tour-execution/shared/model/paged-result.model';
import { AppRating } from './model/app-rating.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'administration/equipment')
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(environment.apiHost + 'administration/equipment/' + id);
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(environment.apiHost + 'administration/equipment', equipment);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + 'administration/users', user);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(environment.apiHost + 'administration/equipment/' + equipment.id, equipment);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'administration/users/' + user.id, user);
  }
  getUsers(): Observable<PagedResults<User>> {
    return this.http.get<PagedResults<User>>(environment.apiHost + 'administration/users');
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.apiHost + 'administration/users/' + id);
  }

  getAppRatings(): Observable<PagedResult<AppRating>> {
    return this.http.get<PagedResult<AppRating>>(environment.apiHost + 'administrator/appRating?page=0&pagesize=0');
  }

  addAppRating(appRating: AppRating): Observable<AppRating> {
    return this.http.post<AppRating>(environment.apiHost + 'tourist/appRating', appRating);
  }

  addAppRatingAuthor(appRating: AppRating): Observable<AppRating> {
    return this.http.post<AppRating>(environment.apiHost + 'author/appRating', appRating);
  }

  /*getAppRating(id: number): Observable<AppRating> {
    return this.http.get<AppRating>(`${environment.apiHost}tourist/appRating/${id}`);
  }*/

    
}
