import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'xp-single-blog-display',
  templateUrl: './single-blog-display.component.html',
  styleUrls: ['./single-blog-display.component.css']
})
export class SingleBlogDisplayComponent implements OnInit{
  public selectedBlog : Blog
  public blogId : number
  constructor(private service: BlogService, private router: Router, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.blogId = Number(params.get('id'));

    if(this.blogId !== 0){
      this.service.getBlog(this.blogId).subscribe((res: Blog) => {
        this.selectedBlog = res;
      });
    }
  });
}

}
