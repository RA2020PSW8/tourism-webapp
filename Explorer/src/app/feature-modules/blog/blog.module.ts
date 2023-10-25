import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';



@NgModule({
  declarations: [
    CommentFormComponent,
    CommentsDisplayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule
  ],
  exports:[
    CommentFormComponent,
    CommentsDisplayComponent
  ]
})
export class BlogModule { }
