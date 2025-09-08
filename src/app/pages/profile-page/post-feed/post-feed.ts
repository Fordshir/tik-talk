import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInput} from '../post-input/post-input';
import {PostComponent} from '../post/post';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent, Subscription, takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-post-feed',
  imports: [
    PostInput,
    PostComponent
  ],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {
  postService = inject(PostService)
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  feed = this.postService.posts

  constructor() {
    firstValueFrom(this.postService.fetchPosts())

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe(() => { this.resizeFeed() })
  }

  ngAfterViewInit() {
    this.resizeFeed()
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

}
