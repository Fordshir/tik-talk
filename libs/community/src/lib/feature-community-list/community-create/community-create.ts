import { ChangeDetectionStrategy, Component } from "@angular/core";
import {ModalBase} from '@tt/common-ui';

@Component({
  selector: "tt-community-create",
  imports: [
    ModalBase
  ],
  templateUrl: "./community-create.html",
  styleUrl: "./community-create.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCreate {}
