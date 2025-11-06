import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {lastMessageRes} from "@tt/data-access";
import {DatePipe} from "@angular/common";
import {AvatarCircle} from '@tt/common-ui';

@Component({
  selector: "button[chats]",
  imports: [AvatarCircle, DatePipe],
  templateUrl: "./chats-btn.html",
  styleUrl: "./chats-btn.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsBtn {
  chat = input<lastMessageRes>();
}
