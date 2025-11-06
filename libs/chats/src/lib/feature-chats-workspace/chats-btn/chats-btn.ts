import {Component, input} from "@angular/core";
import {lastMessageRes} from "../../../../../data-access/src/lib/chats/interfaces/chats.interface";
import {DatePipe} from "@angular/common";
import {AvatarCircle} from '@tt/common-ui';

@Component({
  selector: "button[chats]",
  imports: [AvatarCircle, DatePipe],
  templateUrl: "./chats-btn.html",
  styleUrl: "./chats-btn.scss",
})
export class ChatsBtn {
  chat = input<lastMessageRes>();
}
