import {Observable} from 'rxjs';
import {Card} from './tasks.interface';
import {HttpClient} from '@angular/common/http';

export class TasksService {

  constructor(private http: HttpClient) {
  }

  fetchAll(): Observable<Card[]> {
    return this.http.get<Card[]>('/api/cards');
  }

  fetchId(): Observable<number> {
    return this.http.get<number>('/api/id');
  }

  fetchIds(): Observable<number[]> {
    return this.http.get<number[]>('/api/ids');
  }

  fetchCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`/api/card/${id}`);
  }
}
