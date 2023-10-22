import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ClubJoinRequest } from './model/club-join-request.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  private readonly apiUrl = `${environment.apiHost}tourist`;

  constructor(private http: HttpClient) { }

  getRequests(): Observable<PagedResults<ClubJoinRequest>>{
    return this.http.get<PagedResults<ClubJoinRequest>>(`${this.apiUrl}/clubJoinRequest`);
  }
  updateRequest(request: ClubJoinRequest): Observable<ClubJoinRequest> {
    return this.http.put<ClubJoinRequest>(`${this.apiUrl}/clubJoinRequest`, request);
  }
}
