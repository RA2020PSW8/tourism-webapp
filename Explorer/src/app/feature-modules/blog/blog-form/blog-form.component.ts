import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog, BlogStatus } from '../model/blog.model';
import { toArray } from 'rxjs';
import { BlogString } from '../model/blogform.model';

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
    this.blogForm.patchValue(this.selectedBlog);
  }

  addBlog(): void {
    const blog: BlogString = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: new Date().toISOString().split('T')[0] as string,
      imageLinks: this.blogForm.value.imageLinks?.split('\n') as string[],
      status: this.blogForm.value.status as BlogStatus || ""
    }

    this.prepareBlogForSending(blog);

    this.service.addBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  updateBlog(): void {
    const blog: BlogString = {
      id: this.selectedBlog.id,
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.selectedBlog.creationDate as string,
      imageLinks: null as unknown as string[],
      status: this.blogForm.value.status as BlogStatus
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

  private prepareBlogForSending(b: BlogString) {
    b.description = b.description.replaceAll('\n', '<br>');
  }
}
