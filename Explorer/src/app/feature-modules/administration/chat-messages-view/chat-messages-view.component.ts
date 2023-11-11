import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ChatMessage } from '../model/chat-preview.model';

@Component({
  selector: 'xp-chat-messages-view',
  templateUrl: './chat-messages-view.component.html',
  styleUrls: ['./chat-messages-view.component.css']
})
export class ChatMessagesViewComponent implements OnChanges {

  @Input() followerId: number;

  public messages: ChatMessage[];

  constructor(private profileService: ProfileService){}

  ngOnChanges(): void {
    console.log(this.followerId);
    if(this.followerId > 0){
      this.getMessages();
    }
  }

  getMessages(): void{
    this.profileService.getMessages(this.followerId).subscribe(res => {
      this.messages = res.results;
    });    
  }
}
