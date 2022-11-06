import { Injectable } from '@angular/core';
import { PlanRepas } from 'common/tables/plan-repas';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { Collection, CollectionData } from 'src/utils/data';
import { TableItem } from 'common/tables';
import { getTables, TABLE_ITEMS } from 'src/config/data';
import { AlertManagerService } from '../alert-manager/alert-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataItems: { [K in keyof TableItem]: Collection<TableItem[K]> }

  constructor(
    apiService: ApiService,
    private readonly alertManager: AlertManagerService
  ) {
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
    try {
      await firstValueFrom(this.dataItems[item].insert(data));
      this.alertManager.info(`${item} created.`);
    } catch (e) {
      this.alertManager.info(`Error while creating ${item}.`);
      console.error(e);
    }
  }

  async delete<K extends keyof TableItem>(item: K, id: string | number): Promise<void> {
    try {
      await firstValueFrom(this.dataItems[item].delete(id));
      this.alertManager.info(`${item} deleted.`);
    } catch (e) {
      this.alertManager.info(`Error while deleting ${item}.`);
      console.error(e);
    }
  }

  async patch<K extends keyof TableItem>(item: K, id: string | number, updates: Partial<TableItem[K]>): Promise<void> {
    try {
    await firstValueFrom(this.dataItems[item].patch(id, updates));
      this.alertManager.info(`${item} updated.`);
    } catch (e) {
      this.alertManager.info(`Error while updating ${item}.`);
      console.error(e);
    }
  }
}
