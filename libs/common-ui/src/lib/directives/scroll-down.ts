import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
  selector: "[scrollDown]",
})

export class ScrollDownDirective implements AfterViewInit, OnDestroy {
  private observer: MutationObserver | undefined;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.scrollToBottom();

    this.observer = new MutationObserver(() => {
      this.scrollToBottom();
    });

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  private scrollToBottom() {
    try {
      const element = this.el.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('ScrollDownDirective scroll error', err);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
