import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Encounter } from './model/encounter.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncounterCompletion } from './model/encounterCompletion.model';

@Injectable({
  providedIn: 'root'
})
export class EncountersService {

  private readonly apiUrl = `${environment.apiHost}`;

  constructor(private http: HttpClient) { }

  getEncounters(): Observable<PagedResults<Encounter>>{
    return this.http.get<PagedResults<Encounter>>(`${this.apiUrl}encounter`);
  }

  deleteEncounter(id: number): Observable<Encounter>{
    return this.http.delete<Encounter>(`${this.apiUrl}encounter/${id}`);
  }

  addEncounter(newEncounter: Encounter): Observable<Encounter>{
    return this.http.post<Encounter>(`${this.apiUrl}encounter`, newEncounter);
  }

  updateEncounter(updatedEncounter: Encounter): Observable<Encounter>{
    return this.http.put<Encounter>(`${this.apiUrl}encounter/${updatedEncounter.id}`, updatedEncounter);
  }
  getEncountersByStatus(status: string): Observable<PagedResults<Encounter>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("status", status);
    return this.http.get<PagedResults<Encounter>>(`${this.apiUrl}encounter/status`, {params: queryParams});
  }

  getEncounterCompletionsByUser(): Observable<PagedResults<EncounterCompletion>>{
    return this.http.get<PagedResults<EncounterCompletion>>(`${this.apiUrl}tourist/encounter`);
  }
  startEncounter(encounter: Encounter): Observable<EncounterCompletion>{
    return this.http.post<EncounterCompletion>(`${this.apiUrl}tourist/encounter/startEncounter`, encounter);
  }
  finishEncounter(encounter: Encounter): Observable<EncounterCompletion>{
    return this.http.put<EncounterCompletion>(`${this.apiUrl}tourist/encounter/finishEncounter`, encounter);
  }
}
