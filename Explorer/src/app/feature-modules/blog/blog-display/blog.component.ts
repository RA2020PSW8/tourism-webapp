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
      this.service.getBlogs().subscribe({
        next: (result: PagedResult<Blog>) => {
          this.blogs = result.results;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  getBlogs(): void
  {
    this.service.getBlogs().subscribe({
      next: (result: PagedResult<Blog>) => {
        this.blogs = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onUpdateClicked(blog: Blog): void
  {
    this.selectedBlog = blog;
  }

  /*blogs: Blog[] = [
    {id: 0, title: 'Interesting visit to Portugal', description: 'Angular test', creationdate: '01-01-2023', imagelinks:['test','test1'], status:0},
    {id: 0, title: 'Interesting visit to Singapore', description: 'Angular test2', creationdate: '02-02-2023', imagelinks:['test2','test3'], status:1},
  ]*/
}
