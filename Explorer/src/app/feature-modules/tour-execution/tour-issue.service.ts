import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from './shared/model/paged-result.model';
import { TourIssue } from './model/tour-issue.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourIssueService {

  constructor(private http: HttpClient) { }

  getTourIssues(): Observable<PagedResult<TourIssue>> {
    return this.http.get<PagedResult<TourIssue>>(environment.apiHost + 'tourexecution/tourissue');
  }

  addTourIssue(tourissue: TourIssue): Observable<TourIssue> {
    return this.http.post<TourIssue>(environment.apiHost + 'tourexecution/tourissue', tourissue);
  }

  updateTourIssue(tourissue: TourIssue): Observable<TourIssue> {
    return this.http.put<TourIssue>(environment.apiHost + 'tourexecution/tourissue/'+ tourissue.id, tourissue);
  }

  deleteTourIssue(tourissueId: number): Observable<TourIssue> {
    return this.http.delete<TourIssue>(environment.apiHost + 'tourexecution/tourissue/'+ tourissueId);
  }
}
