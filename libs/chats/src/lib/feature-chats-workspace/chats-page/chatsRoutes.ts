import {Routes} from "@angular/router";
import {ChatsPage} from "./chats";
import {ChatWorkspace} from "../chat-workspace/chat-workspace";

export const chatsRoutes: Routes = [
  {
    path: "",
    component: ChatsPage,
    children: [{ path: ":id", component: ChatWorkspace }],
  },
];
