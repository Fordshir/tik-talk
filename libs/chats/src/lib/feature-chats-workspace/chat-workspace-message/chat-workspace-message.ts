import {ChangeDetectionStrategy, Component, HostBinding, input} from "@angular/core";
import {Message} from "@tt/data-access";
import {DatePipe} from "@angular/common";
import {AvatarCircle} from '@tt/common-ui';

@Component({
  selector: "tt-chat-workspace-message",
  imports: [AvatarCircle, DatePipe],
  templateUrl: "./chat-workspace-message.html",
  styleUrl: "./chat-workspace-message.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessage {
  message = input.required<Message>();

  @HostBinding("class.is-mine")
  get isMine() {
    return this.message().isMine;
  }
}
