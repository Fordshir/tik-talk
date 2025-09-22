import {Component, inject, input} from '@angular/core';
import {ChatWorkspaceMessage} from './chat-workspace-message/chat-workspace-message';
import {MessageInput} from '../../../../common-ui/message-input/message-input';
import {ChatsService} from '../../../../data/services/chats.service';
import {Chat} from '../../../../data/interfaces/chats.interface';
import {firstValueFrom} from 'rxjs';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessage,
    MessageInput,
    NgScrollbar
  ],
  templateUrl: './chat-workspace-messages-wrapper.html',
  styleUrl: './chat-workspace-messages-wrapper.scss'
})
export class ChatWorkspaceMessagesWrapper {
  chatsService = inject(ChatsService)
  chat = input.required<Chat>()

  messages = this.chatsService.activeChatMessages

  async onSendMessage(messageText: string) {
    if (messageText.trim() === '') return;
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText));

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

}
