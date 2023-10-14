import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Profile } from './model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(userId: number): Observable<Profile> {
    const apiUrl = `https://localhost:44333/api/users/profile?userId=${userId}`;
    return this.http.get<Profile>(apiUrl);
  }
}
