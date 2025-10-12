import {Component, input} from "@angular/core";
import {AvatarCircle, TimeAgoPipe} from '@tt/common-ui';
import {PostComment} from '@tt/data-access';

@Component({
  selector: "tt-comment",
  imports: [AvatarCircle, TimeAgoPipe],
  templateUrl: "./comment.component.html",
  styleUrl: "./comment.component.scss",
})
export class CommentComponent {
  comment = input<PostComment>();
}
