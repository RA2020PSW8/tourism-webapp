import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { SingleBlogDisplayComponent } from './single-blog-display/single-blog-display.component';
import { BlogListDisplayComponent } from './blog-list-display/blog-list-display.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    BlogFormComponent,
    CommentFormComponent,
    CommentsDisplayComponent,
    SingleBlogDisplayComponent,
    BlogListDisplayComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule
    
  ],
  exports: [
    CommentFormComponent,
    CommentsDisplayComponent,
    BlogListDisplayComponent
  ]
})
export class BlogModule { }
