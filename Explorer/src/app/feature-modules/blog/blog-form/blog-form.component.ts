import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
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
    const blogForm: BlogString = {
      id: this.selectedBlog.id,
      title: this.selectedBlog.title,
      description: this.selectedBlog.description,
      creationDate : this.selectedBlog.creationDate,
      imageLinks : this.selectedBlog.imageLinks,
      status : this.selectedBlog.status.toString()
    };

    this.blogForm.patchValue(blogForm);
  }

  addBlog(): void{
    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.blogForm.value.creationDate as string,
      imageLinks: this.blogForm.value.imageLinks as string,
      status: Number(this.blogForm.value.status)
    }

    this.service.addBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  updateBlog(): void{
    const blog: Blog = {
      id: this.selectedBlog.id,
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.blogForm.value.creationDate as string,
      imageLinks: this.blogForm.value.imageLinks as string,
      status: Number(this.blogForm.value.status)
    }

    this.service.updateBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }
}
