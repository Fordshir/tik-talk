import {Component, inject, input, OnInit, signal} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {DatePipe} from "@angular/common";
import {AvatarCircle, SvgIconComponent, TimeAgoPipe} from '@tt/common-ui';
import {CommentComponent, PostInput} from '../../ui';
import {GlobalStoreService, Post, PostComment, PostService} from '@tt/data-access';

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
})
export class PostComponent implements OnInit {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;

  comments = signal<PostComment[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    if (commentText) {
      firstValueFrom(
        this.postService.createComment({
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        })
      ).then(async () => {
        const comments = await firstValueFrom(
          this.postService.getCommentsByPostId(this.post()!.id)
        );
        this.comments.set(comments);
      });
      return;
    }
  }
}
