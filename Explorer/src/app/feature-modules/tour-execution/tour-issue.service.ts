import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from './shared/model/paged-result.model';
import { TourIssue } from './model/tour-issue.model';

@Injectable({
  providedIn: 'root'
})
export class TourIssueService {

  constructor(private http: HttpClient) { }

  getTourIssues(): Observable<PagedResult<TourIssue>> {
    return this.http.get<PagedResult<TourIssue>>('https://localhost:44333/api/tourexecution/tourissue');
  }

  addTourIssue(tourissue: TourIssue): Observable<TourIssue> {
    return this.http.post<TourIssue>('https://localhost:44333/api/tourexecution/tourissue', tourissue);
  }

  updateTourIssue(tourissue: TourIssue): Observable<TourIssue> {
    return this.http.put<TourIssue>('https://localhost:44333/api/tourexecution/tourissue/'+ tourissue.id, tourissue);
  }

  deleteTourIssue(tourissueId: number): Observable<TourIssue> {
    return this.http.delete<TourIssue>('https://localhost:44333/api/tourexecution/tourissue/'+ tourissueId);
  }
}
