import { Injectable } from '@angular/core';
import { Client } from 'common/tables/client';
import { Script } from 'common/communication/script';
import { QueryScript } from 'common/communication/query-script';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private clients: BehaviorSubject<Client[]>;
  private queryScripts: BehaviorSubject<QueryScript[]>;

  constructor(private apiService: ApiService) {
    this.clients = new BehaviorSubject<Client[]>([]);
    this.queryScripts = new BehaviorSubject<QueryScript[]>([]);

    this.fetchAll();
  }

  reset(): Observable<null> {
    const obs = this.apiService.post<null>('/db/reset', null);
    obs.subscribe(() => this.fetchAll());
    return obs;
  }

  getResetScript(): Observable<Script> {
    return this.apiService.get('/db/reset/script');
  }

  executeQueryScript(number: string): Observable<object[]> {
    return this.apiService.post('/db/script', { number });
  }

  subscribeClients(next: (value: Client[]) => void) {
    return this.clients.subscribe(next);
  }

  subscribeQueryScripts(next: (value: QueryScript[]) => void) {
    return this.queryScripts.subscribe(next);
  }

  fetchAll() {
    this.fetchClients();
    this.fetchQueryScripts();
  }

  fetchClients(): Observable<Client[]> {
    const observable = this.apiService.get<Client[]>('/client');
    observable.subscribe((clients) => this.clients.next(clients));
    return observable;
  }

  fetchQueryScripts(): Observable<QueryScript[]> {
    const observable = this.apiService.get<QueryScript[]>('/db/script');
    observable.subscribe((queryScripts) => this.queryScripts.next(queryScripts));
    return observable;
  }
}
