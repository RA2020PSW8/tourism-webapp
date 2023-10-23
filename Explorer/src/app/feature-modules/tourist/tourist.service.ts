import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ClubJoinRequest } from './model/club-join-request.model';
import { environment } from 'src/env/environment';
import { ClubInvitation } from './model/club-invitation.model';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  private readonly apiUrl = `${environment.apiHost}tourist`;

  constructor(private http: HttpClient) { }

  getTouristRequests(): Observable<PagedResults<ClubJoinRequest>>{
    return this.http.get<PagedResults<ClubJoinRequest>>(`${this.apiUrl}/clubJoinRequest`);
  }
  getClubRequests(clubId: number): Observable<PagedResults<ClubJoinRequest>>{
    return this.http.get<PagedResults<ClubJoinRequest>>(`${this.apiUrl}/clubJoinRequest/${clubId}`);
  }
  updateRequest(request: ClubJoinRequest): Observable<ClubJoinRequest> {
    return this.http.put<ClubJoinRequest>(`${this.apiUrl}/clubJoinRequest`, request);
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
