import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog, BlogSystemStatus } from '../model/blog.model';
import { toArray } from 'rxjs';

@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})

export class BlogFormComponent implements OnChanges {

  @Output() blogUpdated = new EventEmitter<null>();
  @Input() selectedBlog: Blog;

  constructor(private service: BlogService) { }

  blogForm = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    creationDate: new FormControl(''),
    imageLinks: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
        const blog = {
      title: this.selectedBlog.title,
      description: this.selectedBlog.description,
      creationDate: this.selectedBlog.creationDate,
      imageLinks: this.selectedBlog.imageLinks.toString(),
      systemStatus: this.selectedBlog.systemStatus || ""
    }
    this.blogForm.patchValue(blog);
  }

  addBlog(): void {
    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: new Date().toISOString().split('T')[0] as string,
      imageLinks: this.blogForm.value.imageLinks?.split('\n') as string[],
      systemStatus: this.blogForm.value.status as BlogSystemStatus || ""
    }

    this.prepareBlogForSending(blog);

    this.service.addBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  updateBlog(): void {
    const blog: Blog = {
      id: this.selectedBlog.id,
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.selectedBlog.creationDate as string,
      imageLinks: this.selectedBlog.imageLinks,
      systemStatus: this.blogForm.value.status as BlogSystemStatus
    }
    if(this.blogForm.value.imageLinks?.length != 1)
    {
      blog.imageLinks = this.blogForm.value.imageLinks?.split(',') as unknown as string[];
    }
    else
    {
      blog.imageLinks = this.blogForm.value.imageLinks as unknown as string[];
    }


    this.prepareBlogForSending(blog);

    this.service.updateBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  private prepareBlogForSending(b: Blog) {
    b.description = b.description.replaceAll('\n', '<br>');
  }
}
