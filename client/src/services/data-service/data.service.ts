import { Injectable } from '@angular/core';
import { Client } from 'common/tables/client';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apiService: ApiService) { }

  getClients(): Observable<Client[]> {
    return this.apiService.get<Client[]>('/client');
  }
}
