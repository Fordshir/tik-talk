import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatsList} from './chats-list/chats-list';

@Component({
  selector: 'tt-chats',
  imports: [
    RouterOutlet,
    ChatsList
  ],
  templateUrl: './chats.html',
  styleUrl: './chats.scss'
})
export class ChatsPage {

}
