import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ChatMessage } from '../model/chat-preview.model';

@Component({
  selector: 'xp-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  public chatPreviews: ChatMessage[] = [];
  public selectedChatId: number = -1;

  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
    this.profileService.getPreviewChats().subscribe(res => {
      this.chatPreviews = res;
      this.createAdvertisementMessage();
    });
  }

  chatSelected(event: Number): void{
    this.selectedChatId = event.valueOf();
  }

  private createAdvertisementMessage(): void{
    let adMessage: ChatMessage = {
      content: 'Become pro forklift  player with Tutor',
      creationDateTime: new Date(),
      receiver: {
        name: '',
        surname: '',
        userId: parseInt(localStorage.getItem('loggedId')??'1'),
      },
      sender: {
        name: 'AD: Tutor',
        surname: 'Gaming',
        userId: -1,
        profileImage: 'https://avatars.githubusercontent.com/u/65507197?s=200&v=4'
      }
    }
    this.chatPreviews.push(adMessage);
  }
}
