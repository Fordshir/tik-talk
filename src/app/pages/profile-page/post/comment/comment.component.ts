import {Component, input} from '@angular/core';
import {PostComment} from '../../../../data/interfaces/post.interface';
import {AvatarCircle} from '../../../../common-ui/avatar-circle/avatar-circle';
import {TimeAgoPipe} from '../../../../helpers/pipes/time-ago-pipe';

@Component({
  selector: 'tt-comment',
  imports: [
    AvatarCircle,
    TimeAgoPipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>()
}
