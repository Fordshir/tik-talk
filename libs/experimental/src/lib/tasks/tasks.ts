import {Component, DestroyRef, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Card} from './tasks.interface';
import {TasksService} from './tasks.service';
import {forkJoin, fromEvent, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-card-loader',
  templateUrl: 'tasks.html',
  styleUrl: 'tasks.scss',
  providers: [{
    provide: TasksService,
    useClass: TasksService
  }],
  standalone: true
})

export class CardLoaderComponent {
  destroyRef = inject(DestroyRef)
  cards = signal<Card[]>([]);
  cardsFromIds = signal<Card[]>([]);
  card = signal<Card | null>(null);

  constructor(private tasksService: TasksService) {
  }

  loadCards(){
    this.tasksService.fetchAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => this.cards.set(val))
  }

  loadCard(){
    this.tasksService.fetchId()
      .pipe(
        switchMap(val => this.tasksService.fetchCardById(val)
        ),
        tap(card => this.card.set(card)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
  }

  loadCardsIds() {
    this.tasksService.fetchIds()
      .pipe(switchMap(ids => forkJoin(ids.map(id => this.tasksService.fetchCardById(id)))),
        tap(cards => this.cardsFromIds.set(cards.slice(0, 10))),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
  }

}
