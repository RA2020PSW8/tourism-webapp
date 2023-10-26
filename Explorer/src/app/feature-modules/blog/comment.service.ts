import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from '../../shared/model/paged-results.model';
import { Comment } from './model/comment.model';
import { environment } from 'src/env/environment';
import { Equipment } from '../administration/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(): Observable<PagedResults<Comment>> {
      return this.http.get<PagedResults<Comment>>('https://localhost:44333/api/blog/comments');
  }

  createComment(comment : Comment): Observable<Comment> 
  {
    return this.http.post<Comment>('https://localhost:44333/api/blog/comments',comment);
  }

  deleteComment(comment : Comment): Observable<Comment>
  {
    return this.http.delete<Comment>('https://localhost:44333/api/blog/comments/' + comment.id);
  }

  updateComment(comment : Comment): Observable<Comment>
  {
    return this.http.put<Comment>('https://localhost:44333/api/blog/comments/' + comment.id, comment);
  }
}