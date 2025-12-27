import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject, input,
  Input, OnInit,
  Output,
  Renderer2, signal
} from '@angular/core'
import {debounceTime, fromEvent} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {PostComponent} from '../post/post'
import {PostInput} from '../../ui'
import {Community, GlobalStoreService, postsActions, selectedPosts} from '@tt/data-access'
import {Store} from '@ngrx/store'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tt-post-feed',
  imports: [PostInput, PostComponent],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeed implements OnInit, AfterViewInit {
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)
  profile = inject(GlobalStoreService).me
  community = input<Community | null>(null)
  isMyCommunity = signal<boolean>(false)
  isCommunity = signal<boolean>(false)
  store = inject(Store)
  route = inject(ActivatedRoute)
  router = inject(Router)

  feed = this.store.selectSignal(selectedPosts)

  @Input() postId: number = 0
  @Input() isCommentInput = false
  @Output() created = new EventEmitter<void>()

  constructor() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(50), takeUntilDestroyed())
      .subscribe(() => {
        this.resizeFeed()
      })
  }

  ngOnInit() {
    if(this.router.url.includes('community')){
      this.store.dispatch(postsActions.communityPostsGet())
    }
    this.store.dispatch(postsActions.postsGet())
  }

  ngAfterViewInit() {
    this.resizeFeed()
    this.isCommunity.set(this.router.url.includes('/community'))
    this.isMyCommunity.set(this.isCommunity() && this.community()?.admin.id === this.profile()?.id)
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

  onCreatePost(postText: string) {
    if (!postText) return
    this.store.dispatch(
      postsActions.createPost({
        post: {
          title: 'клёвый пост',
          content: postText,
          authorId: this.profile()!.id
        }
      })
    )
  }
}
