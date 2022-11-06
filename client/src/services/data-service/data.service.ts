import { Injectable } from '@angular/core';
import { PlanRepas } from 'common/tables/plan-repas';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { Collection, CollectionData } from 'src/utils/data';
import { TableItem } from 'common/tables';
import { getTables, TABLE_ITEMS } from 'src/config/data';

// interface DataItem {
//   planRepas: PlanRepas;
// }

// const DATA_ITEMS: { [K in keyof DataItem]: string } = {
//   planRepas: '/plan-repas',
// };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataItems: { [K in keyof TableItem]: Collection<TableItem[K]> }

  constructor(private readonly apiService: ApiService) {
    this.dataItems = {} as any;

    for (const key of getTables()) {
      this.dataItems[key] = apiService.createData<typeof key>(TABLE_ITEMS[key].path) as any;
    }
  }

  subscribe<K extends keyof TableItem>(item: K, next: (value: CollectionData<TableItem[K]>) => void): Subscription {
    return this.dataItems[item].subscribe(next);
  }

  async update<K extends keyof TableItem>(item: K | K[]): Promise<void> {
    const items = typeof item === 'string' ? [item] : item;

    const p = [];
    for (const itemKey of items) {
      p.push(firstValueFrom(this.dataItems[itemKey].fetch()));
    }

    await Promise.all(p);
  }

  async updateAll(): Promise<void> {
    const p = [];
    for (const item of Object.values(this.dataItems)) {
      p.push(firstValueFrom(item.fetch() as any));
    }

    await Promise.all(p);
  }

  async insert<K extends keyof TableItem>(item: K, data: Partial<TableItem[K]>): Promise<void> {
    await firstValueFrom(this.dataItems[item].insert(data))
  }

  async delete<K extends keyof TableItem>(item: K, id: string | number): Promise<void> {
    await firstValueFrom(this.dataItems[item].delete(id));
  }

  async patch<K extends keyof TableItem>(item: K, id: string | number, updates: Partial<TableItem[K]>): Promise<void> {
    await firstValueFrom(this.dataItems[item].patch(id, updates));
  }

  // subscribe<T extends keyof DataItem>(item: T, next: (value: CollectionData<DataItem[T]>) => void): Subscription {
  //   return (this.dataMap.get(item)! as Collection<DataItem[T]>).subscribe(next);
  // }

  // update(item: keyof DataItem | (keyof DataItem)[]): void {
  //   const items = typeof item === 'string' ? [item] : item;

  //   for (const itemKey of items) {
  //     this.dataMap.get(itemKey)!.fetch();
  //   }
  // }

  // updateAll(): void {
  //   for (const data of this.dataMap.values()) {
  //     data.fetch();
  //   }
  // }

  // async deletePlanRepas(id: number): Promise<void> {
    // await this.apiService.delete('/plan-repas', {id: id}).subscribe();
    // this.update('planRepas');
  // }

  // async addPlanRepas(plan: Omit<PlanRepas, 'idplanrepas'>): Promise<void> {
  //   await this.apiService.post('/plan-repas', {plan: plan}).subscribe();
  //   this.update('planRepas');
  // }

  // async updatePlanRepas(plan: PlanRepas): Promise<void> {
    // await this.apiService.patch('/plan-repas', {plan: plan}).subscribe();
    // this.update('planRepas');
  // }
}
