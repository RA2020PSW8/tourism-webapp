import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog-display/blog.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';
import { MatTable, MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    BlogComponent,
    BlogFormComponent,
    CommentFormComponent,
    CommentsDisplayComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    BlogComponent,
    CommentFormComponent,
    CommentsDisplayComponent,
  ]
})
export class BlogModule { }
