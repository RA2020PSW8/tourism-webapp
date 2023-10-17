import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog-display/blog.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';



@NgModule({
  declarations: [
    BlogComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    BlogComponent
  ]
})
export class BlogModule { }
