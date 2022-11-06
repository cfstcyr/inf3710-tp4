import { Injectable } from '@angular/core';
import { QueryScript } from 'common/communication/query-script';
import { Script } from 'common/communication/script';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { DataService } from '../data-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private readonly apiService: ApiService, private readonly dataService: DataService) { }

  async reset(): Promise<void> {
    await firstValueFrom(this.apiService.post<null>('/db/reset', null));
    await this.dataService.updateAll();
  }

  getResetScript(): Observable<Script> {
    return this.apiService.get('/db/reset/script');
  }
}
