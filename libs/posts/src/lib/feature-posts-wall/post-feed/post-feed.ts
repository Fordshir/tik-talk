import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
} from "@angular/core";
import {debounceTime, fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PostComponent} from '../post/post';
import {PostInput} from '../../ui';
import {GlobalStoreService, postsActions, selectedPosts} from '@tt/data-access';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-post-feed",
  imports: [PostInput, PostComponent],
  templateUrl: "./post-feed.html",
  styleUrl: "./post-feed.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeed {
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject (GlobalStoreService).me;
  store = inject(Store)

  feed = this.store.selectSignal(selectedPosts);

  @Input() postId: number = 0;
  @Input() isCommentInput = false;
  @Output() created = new EventEmitter<void>();

  constructor() {
    fromEvent(window, "resize")
      .pipe(debounceTime(50), takeUntilDestroyed())
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  ngOnInit() {
    this.store.dispatch(postsActions.postsGet())
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, "height", `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;
    this.store.dispatch(postsActions.createPost({
      post: {
        title: 'клёвый пост',
        content: postText,
        authorId: this.profile()!.id
      }
    }))
  }
}
