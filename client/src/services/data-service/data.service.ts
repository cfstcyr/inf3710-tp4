import { Injectable } from '@angular/core';
import { PlanRepas } from 'common/tables/plan-repas';
import { Subscription } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { Data, ResponseData } from 'src/utils/data';

interface DataItem {
  planRepas: PlanRepas;
}

const DATA_ITEMS: { [K in keyof DataItem]: string } = {
  planRepas: '/plan-repas',
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataMap: Map<keyof DataItem, Data<unknown>>;

  constructor(private apiService: ApiService) {
    this.dataMap = new Map();

    for (const key of Object.keys(DATA_ITEMS) as (keyof DataItem)[]) {
      this.dataMap.set(key, apiService.createData(DATA_ITEMS[key]));
    }
  }

  subscribe<T extends keyof DataItem>(item: T, next: (value: ResponseData<DataItem[T]>) => void): Subscription {
    return (this.dataMap.get(item)! as Data<DataItem[T]>).subscribe(next);
  }

  update(item: keyof DataItem | (keyof DataItem)[]): void {
    const items = typeof item === 'string' ? [item] : item;

    for (const itemKey of items) {
      this.dataMap.get(itemKey)!.fetch();
    }
  }

  updateAll(): void {
    for (const data of this.dataMap.values()) {
      data.fetch();
    }
  }

  async deletePlanRepas(id: number): Promise<void> {
    await this.apiService.delete('/plan-repas', {id: id}).subscribe();
    this.update('planRepas');
  }
}
