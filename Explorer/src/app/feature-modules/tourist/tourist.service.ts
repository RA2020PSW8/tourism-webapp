import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import {Club} from './model/clubs.model'
import {environment} from 'src/env/environment'


@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor(private http: HttpClient) {


  }

  getClubs():Observable<PagedResults<Club>>{
    return this.http.get<PagedResults<Club>>(environment.apiHost+'tourist/clubs');
  }

  addClub(club: Club): Observable<Club>{
    return this.http.post<Club>(environment.apiHost+'tourist/clubs',club)
  }
  
}
