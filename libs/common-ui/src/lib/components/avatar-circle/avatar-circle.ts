import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {ImgUrlPipe} from '../../pipes/img-url-pipe';

@Component({
  selector: "tt-avatar-circle",
  imports: [ImgUrlPipe],
  templateUrl: "./avatar-circle.html",
  styleUrl: "./avatar-circle.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCircle {
  avatarUrl = input<string | null>();
}
