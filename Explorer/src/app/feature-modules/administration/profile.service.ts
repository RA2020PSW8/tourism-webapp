import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Profile } from './model/profile.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

   }

  getProfile(userId: number): Observable<Profile> {
    
    return this.http.get<Profile>(`${environment.apiHost}profile/${userId}`);

  }

  updateProfile(userId: number, updatedProfile: Profile): Observable<Profile> {
    
    return this.http.put<Profile>(`${environment.apiHost}profile/${userId}`, updatedProfile);
  }
}