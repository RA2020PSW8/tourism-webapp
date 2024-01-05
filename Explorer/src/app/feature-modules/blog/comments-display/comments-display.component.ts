import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';
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
  
public editMode : boolean
public comment : Comment

  public comments: Comment[] = []

  constructor(private commentService: CommentService){}

  ngOnInit(): void{
    this.getComments();
  }

  getComments(): void{
    this.commentService.getComments(0,0,this.blogId).subscribe({
      next : (response: PagedResults<Comment>)=>{
        this.comments = response.results;
        this.comments.reverse();
        this.editMode = false;
      },
      error:(err : any)=>{
        console.log(err);
      }
    });
  }

onUpdateClicked(comment: Comment): void
{
  this.editMode = true;
  this.comment = comment;
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