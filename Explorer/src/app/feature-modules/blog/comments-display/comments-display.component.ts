import { Component,Input,OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from './../model/comment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-comments-display',
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.css']
})
export class CommentsDisplayComponent implements OnInit {
  
  @Input() blogId : number
  @Input() systemStatus : string
  
  public comments: Comment[] = []
  public selectedComment: Comment
  public editMode: boolean
  public shouldRenderForm : boolean = false

  constructor(private commentService: CommentService){}

  ngOnInit(): void{
    this.commentService.getComments(0,0,this.blogId).subscribe({
      next: (result: PagedResults<Comment>) =>{
        this.comments = result.results;
      },
      error: (err: any) => {
        console.log(err);
      },
      
    })
  }

  getComments(): void{
    this.commentService.getComments(0,0,this.blogId).subscribe({
      next : (response: PagedResults<Comment>)=>{
        this.comments = response.results;
        this.shouldRenderForm = false;
      },
      error:(err : any)=>{
        console.log(err);
      }
    });
  }

onUpdateClicked(comment: Comment): void
{
  this.shouldRenderForm = true;
 this.editMode = true;
 this.selectedComment = comment;
}

onAddClicked(): void{
  this.shouldRenderForm = true;
  this.editMode = false;
}

onDeleteClicked(comment: Comment): void
{
  this.commentService.deleteComment(comment).subscribe({
    next: (_) => {
      this.getComments();
    }
  });
}

}
