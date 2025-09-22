import {Component, input} from '@angular/core';
import {AvatarCircle} from '../../../common-ui/avatar-circle/avatar-circle';
import {lastMessageRes} from '../../../data/interfaces/chats.interface';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'button[chats]',
  imports: [
    AvatarCircle,
    DatePipe
  ],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss'
})
export class ChatsBtn {
  chat = input<lastMessageRes>()
}
