import {Component, input} from '@angular/core';
import {AvatarCircle} from '../../../common-ui/avatar-circle/avatar-circle';
import {lastMessageRes} from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  imports: [
    AvatarCircle
  ],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss'
})
export class ChatsBtn {
  chat = input<lastMessageRes>()
}
