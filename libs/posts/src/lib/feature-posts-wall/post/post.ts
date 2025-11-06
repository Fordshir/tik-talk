import {ChangeDetectionStrategy, Component, inject, input} from "@angular/core";
import {DatePipe} from "@angular/common";
import {AvatarCircle, SvgIconComponent, TimeAgoPipe} from '@tt/common-ui';
import {CommentComponent, PostInput} from '../../ui';
import {GlobalStoreService, Post, postsActions} from '@tt/data-access';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-post",
  imports: [
    AvatarCircle,
    SvgIconComponent,
    PostInput,
    CommentComponent,
    TimeAgoPipe,
  ],
  providers: [DatePipe],
  templateUrl: "./post.html",
  styleUrl: "./post.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  store = inject(Store);

  onCreated(commentText: string) {
    if (commentText) {
      this.store.dispatch(postsActions.createComment({
        comment: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        }
      }))

      return;
    }
  }
}
