import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from './shared/model/paged-result.model';
import { Blog } from './model/blog.model';
import { environment } from 'src/env/environment';
<<<<<<< HEAD
import { Rating } from './model/rating.model';
=======
>>>>>>> 0b2a354 (fix: removed redundant BlogString class)

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<PagedResult<Blog>> {
      return this.http.get<PagedResult<Blog>>(environment.apiHost + 'blog');
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 91fa042 (feat: added single blog display)
  getBlog(id: Number): Observable<Blog> {
    return this.http.get<Blog>(`${environment.apiHost}blog/${id}`);
}

<<<<<<< HEAD
=======
>>>>>>> 0b2a354 (fix: removed redundant BlogString class)
=======
>>>>>>> 91fa042 (feat: added single blog display)
  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(environment.apiHost + 'blog',blog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(environment.apiHost + 'blog/'+blog.id,blog);
  }

  deleteBlog(blog: Blog): Observable<Blog> {
    return this.http.delete<Blog>(environment.apiHost + 'blog/'+blog.id);
  }

  addRating(rating: Rating):Observable<Blog>{
    return this.http.post<Blog>(environment.apiHost + 'blog/rate',rating);
  }
}
