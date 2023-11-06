import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from './shared/model/paged-result.model';
import { Blog } from './model/blog.model';
import { environment } from 'src/env/environment';
import { BlogString } from './model/blogform.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<PagedResult<Blog>> {
      return this.http.get<PagedResult<Blog>>(environment.apiHost + 'blog');
  }

  addBlog(blog: BlogString): Observable<Blog> {
    return this.http.post<Blog>(environment.apiHost + 'blog',blog);
  }

  updateBlog(blog: BlogString): Observable<Blog> {
    return this.http.put<Blog>(environment.apiHost + 'blog/'+blog.id,blog);
  }

  deleteBlog(blog: Blog): Observable<Blog> {
    return this.http.delete<Blog>(environment.apiHost + 'blog/'+blog.id);
  }
}
