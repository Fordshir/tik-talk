import {Component, input} from "@angular/core";
import {AvatarCircle} from '@tt/common-ui';
import {Profile} from '../../../../../data-access/src/lib/profile/interfaces/profile.interface';

@Component({
  selector: "tt-chat-workspace-header",
  imports: [AvatarCircle],
  templateUrl: "./chat-workspace-header.html",
  styleUrl: "./chat-workspace-header.scss",
})
export class ChatWorkspaceHeader {
  profile = input.required<Profile>();
}
