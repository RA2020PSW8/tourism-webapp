import { Component, EventEmitter,Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'xp-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})

export class CommentFormComponent implements OnChanges {

@Output() commentAdded = new EventEmitter<null>();
@Input() comment : Comment;
@Input() editMode: boolean = false;
@Input() blogId: number

constructor(private service: CommentService) {}
 
ngOnChanges(changes: SimpleChanges): void {
  this.commentForm.reset();
  if(this.editMode == true){
    this.commentForm.patchValue(this.comment);
  }
  }

  commentForm = new FormGroup({
    comment: new FormControl('',[Validators.required]),
  })

  ngOnInit(){}

  onSubmit():void{
    if(this.commentForm.valid){
      alert('top');
    }else{
      alert('bottom');
    }
  }

  createComment(): void
  {
    const newComment: Comment = {
      blogId: this.blogId,
      postTime: new Date(),
      lastEditTime: new Date(),
      comment: this.commentForm.value.comment || "", 
      isDeleted: false
    }
    this.service.createComment(newComment).subscribe({
      next: (_) => {
        this.commentAdded.emit();
      }
    });
  }

  updateComment(): void
  {
    const com : Comment = {
      comment: this.commentForm.value.comment || "",
      blogId: this.blogId,
      postTime: new Date(),
      isDeleted: false
    }
    com.id = this.comment.id;
    com.blogId = this.comment.blogId;
    com.username = this.comment.username;
    com.lastEditTime = this.comment.lastEditTime;
    com.postTime = this.comment.postTime;
    com.isDeleted = this.comment.isDeleted;

    this.service.updateComment(com).subscribe({
      next: (_) => {
        this.commentAdded.emit();
      }
    });
  }
}
