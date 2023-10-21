import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { PagedResult } from '../shared/model/paged-result.model';

@Component({
  selector: 'xp-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private service: BlogService) { }

  blogs: Blog[] = [];
  selectedBlog: Blog;

  ngOnInit(): void {
      this.getBlogs();
  }

  getBlogs(): void
  {
    this.blogs = [];
    this.service.getBlogs().subscribe({
      next: (result: PagedResult<Blog>) => {
        for(let b of result.results)
        {
          this.prepareBlogForDisplay(b);
          this.blogs.push(b);
          console.log(b)
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  private prepareBlogForDisplay(b: Blog) {
    b.creationDate = b.creationDate.slice(0, 10);
    b.description = b.description.replaceAll('\n', '<br>');
    //todo enum u str, i metoda koja radi kontra
    //kasnije iz razloga da ne pokvari CRUD
  }

  onUpdateClicked(blog: Blog): void
  {
    this.selectedBlog = blog;
  }

  onDeleteClicked(blog: Blog): void
  {
    this.service.deleteBlog(blog).subscribe({
      next: (_) => {
        this.getBlogs();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
