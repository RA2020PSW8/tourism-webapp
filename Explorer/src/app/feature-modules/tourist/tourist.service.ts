import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentForSelection } from './model/eqipment-for-selection.model';
import { TouristEquipment } from './model/tourist-equipment.model';
import { Observable } from 'rxjs';
import { PagedResults } from '../../shared/model/paged-results.model';
import { ClubInvitation } from './model/club-invitation.model';
import { environment } from '../../../env/environment';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor(private http: HttpClient) { }

  getEquipmentForSelection(): Observable<EquipmentForSelection[]> {
    return this.http.get<EquipmentForSelection[]>(environment.apiHost + 'tourist/touristEquipment/forSelected/' + parseInt(localStorage.getItem('loggedId')!))
  }

  createSelectionEquipment(touristEquipment : TouristEquipment): Observable<TouristEquipment> {
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment', touristEquipment) 
  }
  
  deleteSelectionEquipment(touristEquipment : TouristEquipment): Observable<TouristEquipment> {
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment/deleteByTouristAndEquipmentId', touristEquipment) 
  }
  
  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/clubs/byUser');
  }

  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'tourist/clubs/' + club.id, club);
  }

  getClubInvitations(): Observable<PagedResults<ClubInvitation>> {
    return this.http.get<PagedResults<ClubInvitation>>(environment.apiHost + 'tourist/clubInvitation');
  }

  addClubInvitation(clubInvitation: ClubInvitation): Observable<ClubInvitation> {
    return this.http.post<ClubInvitation>(environment.apiHost + 'tourist/clubInvitation', clubInvitation)
  }

}
