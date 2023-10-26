import { Component,OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from './../model/comment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-comments-display',
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.css']
})
export class CommentsDisplayComponent implements OnInit {
  public comments: Comment[] = []
  public selectedComment: Comment
  public editMode: boolean
  public shouldRenderForm : boolean = false

  constructor(private commentService: CommentService){}

  ngOnInit(): void{
    this.commentService.getComments().subscribe({
      next: (result: PagedResults<Comment>) =>{
        this.comments = result.results;
      },
      error: (err: any) => {
        console.log(err);
      },
      
    })
  }

  getComments(): void{
    this.commentService.getComments().subscribe({
      next : (response: PagedResults<Comment>)=>{
        this.comments = response.results;
      },
      error:(err : any)=>{
        console.log(err);
      }
    });
  }

onUpdateClicked(comment: Comment): void
{
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
