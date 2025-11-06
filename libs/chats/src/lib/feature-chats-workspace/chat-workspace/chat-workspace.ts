import {Component, inject} from "@angular/core";
import {ChatWorkspaceHeader} from "../chat-workspace-header/chat-workspace-header";
import {ChatWorkspaceMessagesWrapper} from "../chat-workspace-messages-wrapper/chat-workspace-messages-wrapper";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatsService} from "../../../../../data-access/src/lib/chats/services/chats.service";
import {filter, of, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: "tt-chat-workspace",
  imports: [ChatWorkspaceHeader, ChatWorkspaceMessagesWrapper, AsyncPipe],
  templateUrl: "./chat-workspace.html",
  styleUrl: "./chat-workspace.scss",
})
export class ChatWorkspace {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatService = inject(ChatsService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if(id === 'new')  {
        return this.route.queryParams.pipe(
          filter(({userId}) => userId),
          switchMap(({userId}) => {
            return this.chatService.createChat(userId).pipe(
              switchMap(chat => {
                this.router.navigate(['chats', chat.id])
                return of(null)
              })
            )
          })
        )
      }

      return this.chatService.getChatById(id)
    })
  );
}
