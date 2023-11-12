import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ChatMessage } from '../model/chat-preview.model';
import { MessageInput } from '../model/message-input.model';

@Component({
  selector: 'xp-chat-messages-view',
  templateUrl: './chat-messages-view.component.html',
  styleUrls: ['./chat-messages-view.component.css']
})
export class ChatMessagesViewComponent implements OnChanges {

  @Input() followerId: number;
  @Output() messageSent = new EventEmitter<void>();

  public messages: ChatMessage[] = [];
  public messageContent: string;

  constructor(private profileService: ProfileService){}

  ngOnChanges(): void {
    if(this.followerId > 0){
      this.getMessages();
    }
  }

  getMessages(): void{
    this.profileService.getMessages(this.followerId).subscribe(res => {
      this.messages = res.results;
    });    
  }

  sendMessage(){
    if(this.messageContent){
      let message: MessageInput = {
        receiverId: this.followerId,
        content: this.messageContent
      }
      this.profileService.sendMessage(message).subscribe(res => {
        this.messageContent = '';
        this.getMessages();
        this.messageSent.emit();
      });
    }
  }
}
