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

  getBlogs(): void {
    this.blogs = [];
    this.service.getBlogs().subscribe({
      next: (result: PagedResult<Blog>) => {
        for(let b of result.results)
        {
          this.prepareBlogForDisplay(b);
          this.blogs.push(b);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  private prepareBlogForDisplay(b: Blog) {
    b.description = b.description.replaceAll('\n', '<br>');
    if(b.status == "0")
      b.status = "Draft";
    else if(b.status == "1")
      b.status = "Published";
    else
      b.status = "Closed";
  }

  onUpdateClicked(blog: Blog): void
  {
    blog.description = blog.description.replace('<br>','\n');
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
