import { Injectable } from '@angular/core';
import { QueryScript } from 'common/communication/query-script';
import { Script } from 'common/communication/script';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private readonly apiService: ApiService) { }

  // reset(): Observable<null> {
  //   return this.apiService.post<null>('/db/reset', null);
  // }

  // getResetScript(): Observable<Script> {
  //   return this.apiService.get('/db/reset/script');
  // }

  // executeQueryScript(number: string): Observable<object[]> {
  //   return this.apiService.post('/db/script', { number });
  // }

  // subscribeQueryScripts(next: (value: QueryScript[]) => void) {
  //   return this.queryScripts.subscribe(next);
  // }
}
