import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentForSelection } from './model/eqipment-for-selection.model';
import { TouristEquipment } from './model/tourist-equipment.model';
import { Observable } from 'rxjs';
import { PagedResults } from '../../shared/model/paged-results.model';
import { ClubInvitation } from './model/club-invitation.model';
import { environment } from '../../../env/environment';
import { Club } from './model/club.model';
import { ClubJoinRequest } from './model/club-join-request.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  private readonly apiUrl = `${environment.apiHost}tourist`;

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
  
  getAllClubs():Observable<PagedResults<Club>>{
    return this.http.get<PagedResults<Club>>(environment.apiHost+'tourist/clubs');
  }

  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/clubs/byUser');
  }

  addClub(club: Club): Observable<Club>{
    return this.http.post<Club>(environment.apiHost+'tourist/clubs',club)
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

  getTouristRequests(): Observable<PagedResults<ClubJoinRequest>>{
    return this.http.get<PagedResults<ClubJoinRequest>>(`${this.apiUrl}/clubJoinRequest`);
  }
  getClubRequests(clubId: number): Observable<PagedResults<ClubJoinRequest>>{
    return this.http.get<PagedResults<ClubJoinRequest>>(`${this.apiUrl}/clubJoinRequest/${clubId}`);
  }
  updateRequest(request: ClubJoinRequest): Observable<ClubJoinRequest> {
    return this.http.put<ClubJoinRequest>(`${this.apiUrl}/clubJoinRequest`, request);
  }
  joinClub(club: Club): Observable<Club>{
    return this.http.post<Club>(`${this.apiUrl}/clubJoinRequest`, club);
  }

  deleteClub(club: Club): Observable<Club>{
    return this.http.delete<Club>(environment.apiHost+'tourist/clubs/'+club.id); 
  }

  getClubById(id: number): Observable<Club>{
    return this.http.get<Club>(`${this.apiUrl}/clubs/${id}`);
  }

}
