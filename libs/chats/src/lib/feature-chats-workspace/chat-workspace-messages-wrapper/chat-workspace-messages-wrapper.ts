import {ChangeDetectionStrategy, Component, inject, input} from "@angular/core";
import {ChatWorkspaceMessage} from "../chat-workspace-message/chat-workspace-message";
import {MessageInput} from "../../ui/message-input/message-input";
import {ChatsService, Chat} from "@tt/data-access";
import {ScrollDownDirective} from '../../../../../common-ui/src/lib/directives/scroll-down';

@Component({
  selector: "tt-chat-workspace-messages-wrapper",
  imports: [ChatWorkspaceMessage, MessageInput, ScrollDownDirective],
  templateUrl: "./chat-workspace-messages-wrapper.html",
  styleUrl: "./chat-workspace-messages-wrapper.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapper {
  chatsService = inject(ChatsService);
  chat = input.required<Chat>();

  messages = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {
    if (messageText.trim().length > 0) {
      this.chatsService.wsAdapter.sendMessage(
        messageText,
        this.chat().id
      )
    }
  }
}
