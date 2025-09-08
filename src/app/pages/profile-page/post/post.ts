import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComment} from '../../../data/interfaces/post.interface';
import {AvatarCircle} from '../../../common-ui/avatar-circle/avatar-circle';
import {DatePipe} from '@angular/common';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {PostInput} from '../post-input/post-input';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {TimeAgoPipe} from '../../../helpers/pipes/time-ago-pipe';

@Component({
  selector: 'tt-post',
  imports: [
    AvatarCircle,
    SvgIcon,
    PostInput,
    CommentComponent,
    TimeAgoPipe,
  ],
  providers: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>()

  comments = signal<PostComment[]>([])

  postService = inject(PostService)

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comments);
  }

}
