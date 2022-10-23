import { Injectable } from '@angular/core';
import { Client } from 'common/tables/client';
import { Script } from 'common/communication/script';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apiService: ApiService) { }

  reset(): Observable<null> {
    return this.apiService.post('/db/reset', null);
  }

  getResetScript(): Observable<Script> {
    return this.apiService.get('/db/reset/script');
  }

  getClients(): Observable<Client[]> {
    return this.apiService.get<Client[]>('/client');
  }
}
