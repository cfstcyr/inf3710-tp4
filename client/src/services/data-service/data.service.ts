import { Injectable } from '@angular/core';
import { Client } from 'common/tables/client';
import { Script } from 'common/communication/script';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private clients: BehaviorSubject<Client[]>;

  constructor(private apiService: ApiService) {
    this.clients = new BehaviorSubject<Client[]>([]);

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

  subscribeClients(next: (value: Client[]) => void) {
    this.clients.subscribe(next);
  }

  fetchAll() {
    this.fetchClients();
  }

  fetchClients(): Observable<Client[]> {
    const observable = this.apiService.get<Client[]>('/client');
    observable.subscribe((clients) => this.clients.next(clients));
    return observable;
  }
}
