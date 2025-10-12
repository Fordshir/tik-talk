import {Component, inject} from "@angular/core";
import {ChatsBtn} from "../chats-btn/chats-btn";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ChatsService} from "../../../../../data-access/src/lib/chats/services/chats.service";
import {AsyncPipe} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {map, startWith, switchMap} from "rxjs";

@Component({
  selector: "tt-chats-list",
  imports: [
    ChatsBtn,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: "./chats-list.html",
  styleUrl: "./chats-list.scss",
})
export class ChatsList {
  chatsService = inject(ChatsService);

  filterChatsControl = new FormControl();

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(""),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes(inputValue.toLowerCase() ?? "");
          });
        })
      );
    })
  );
}
