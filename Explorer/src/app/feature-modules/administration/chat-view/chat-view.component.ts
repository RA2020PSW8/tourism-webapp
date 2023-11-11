import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ChatMessage } from '../model/chat-preview.model';

@Component({
  selector: 'xp-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  public chatPreviews: ChatMessage[];
  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
    this.profileService.getPreviewChats().subscribe(res => {
      this.chatPreviews = res;
    });
  }
}
