import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from './shared/model/paged-result.model';
import { Blog } from './model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<PagedResult<Blog>> {
      return this.http.get<PagedResult<Blog>>('https://localhost:44333/api/blog');
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('https://localhost:44333/api/blog',blog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>('https://localhost:44333/api/blog/'+blog.id,blog);
  }

  deleteBlog(blog: Blog): Observable<Blog> {
    return this.http.delete<Blog>('https://localhost:44333/api/blog/'+blog.id);
  }
}
