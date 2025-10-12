import {Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2,} from "@angular/core";
import {debounceTime, firstValueFrom, fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PostComponent} from '../post/post';
import {PostInput} from '../../ui';
import {GlobalStoreService, Post, PostService} from '@tt/data-access';

@Component({
  selector: "tt-post-feed",
  imports: [PostInput, PostComponent],
  templateUrl: "./post-feed.html",
  styleUrl: "./post-feed.scss",
})
export class PostFeed {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject (GlobalStoreService).me;

  feed: Post[] = [];

  @Input() postId: number = 0;
  @Input() isCommentInput = false;
  @Output() created = new EventEmitter<void>();

  constructor() {
    this.loadPosts();

    fromEvent(window, "resize")
      .pipe(debounceTime(50), takeUntilDestroyed())
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, "height", `${height}px`);
  }

  loadPosts() {
    firstValueFrom(this.postService.fetchPosts()).then((posts) => {
      this.feed = posts;
    });
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(
      this.postService.createPost({
        title: "клёвый пост",
        content: postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
      this.loadPosts();
    });
  }
}
