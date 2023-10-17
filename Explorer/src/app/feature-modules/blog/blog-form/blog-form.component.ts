import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
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
    //this.blogForm.patchValue(this.selectedBlog);
      /*console.log("aa");
      this.blogForm.value.title = this.selectedBlog.title;
      this.blogForm.value.imageLinks = this.selectedBlog.imageLinks.toString();*/
  }

  addBlog(): void{
    console.log(this.blogForm.value);

    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.blogForm.value.creationDate as string,
      imageLinks: [this.blogForm.value.imageLinks as string],
      status: this.blogForm.value.status as string
    }

    this.service.addBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }
}
