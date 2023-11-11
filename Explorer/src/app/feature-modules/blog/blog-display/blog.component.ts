import { Component, OnInit } from '@angular/core';
import { Blog, BlogSystemStatus } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { PagedResult } from '../shared/model/paged-result.model';
import { BlogStatus } from '../model/blogstatus-model';

@Component({
  selector: 'xp-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private service: BlogService) { }

  blogs: Blog[] = [];
  allBlogs: Blog[] = [];
  selectedBlog: Blog;
  public allBlogStatus: BlogStatus[] = [];
  public selectedBlogStatus: BlogStatus[] = [];
  public existingColors: string[] = [];

  ngOnInit(): void {
      this.selectedBlog = {
        title: '',
        description: '',
        creationDate: new Date().toISOString(),
        imageLinks: [],
        systemStatus: BlogSystemStatus.DRAFT,
      }
      //TODO uvezi sa feat/blog-status
      let famous: BlogStatus = {
        name: 'famous',
        frontColor: this.generateRandomPastelColor()
      }
      let veryfamous: BlogStatus = {
        name: 'veryfamous',
        frontColor: this.generateRandomPastelColor()
      }
      this.allBlogStatus.push(famous);
      this.allBlogStatus.push(veryfamous);
      this.getBlogs();
  }

  getBlogs(): void {
    this.blogs = [];
    this.service.getBlogsWithStatus().subscribe({
      next: (result: PagedResult<Blog>) => {
        for(let b of result.results)
        {
          this.prepareBlogForDisplay(b);
          this.blogs.push(b);
          this.allBlogs.push(b);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  private prepareBlogForDisplay(b: Blog) {
    b.description = b.description.replaceAll('\n', '<br>');
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

  generateRandomPastelColor(): string {
    const generateRandomNumber = () => Math.floor(Math.random() * 256);
  
    const generatePastelHex = () => {
      const r = (generateRandomNumber() + 256) / 2; // Shift towards lighter tones
      const g = (generateRandomNumber() + 256) / 2;
      const b = (generateRandomNumber() + 256) / 2;
      return `#${Math.round(r).toString(16)}${Math.round(g).toString(16)}${Math.round(b).toString(16)}`;
    };
  
    let newColor;
  
    do {
      newColor = generatePastelHex();
    } while (this.existingColors.includes(newColor));
    this.existingColors.push(newColor);
    return newColor;
  }

  getColor(name: string): string {
    for(let bs of this.allBlogStatus)
    {
      if(bs.name === name)
        return bs.frontColor
    }
    return "#FFFFFF"
  }

  modifyFilter(blogStatus: BlogStatus)
  {
    this.blogs = [];
    if(this.selectedBlogStatus.includes(blogStatus))
    {
      this.selectedBlogStatus = this.selectedBlogStatus.filter(b => b.name != blogStatus.name);

    }
    else
    {
      this.selectedBlogStatus.push(blogStatus);
    }
    if(this.selectedBlogStatus.length > 0)
    {
      for(let b of this.allBlogs)
      {
        for(let localbs of b.blogStatuses as BlogStatus[])
          for(let bs of this.selectedBlogStatus)
          {
            if(localbs.name == bs.name)
              this.blogs.push(b);
          }
      }
    }
    else
      this.blogs = this.allBlogs;
  }
}
