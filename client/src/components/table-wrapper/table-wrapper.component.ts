import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableItem } from 'common/tables';
import { Subject, Subscription } from 'rxjs';
import { AddPlanRepasComponent } from 'src/components/add-plan-repas/add-plan-repas.component';
import { DeleteTableItemComponent, DeleteTableItemData } from 'src/components/delete-table-item/delete-table-item.component';
import { UpdatePlanRepasComponent } from 'src/components/update-plan-repas/update-plan-repas.component';
import { DataService } from 'src/services/data-service/data.service';
import { CollectionData, DefaultCollectionData } from 'src/utils/data';
import { HelpersComponent } from '../helpers-component/helpers.component';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent<K extends keyof TableItem> extends HelpersComponent implements OnInit, OnChanges {
  @Input() table?: K;
  protected collectionData: CollectionData<TableItem[K]>;
  protected that = this;
  private dataSubscription: undefined | Subscription

  constructor(
    private dialog: MatDialog, 
    private readonly dataService: DataService,
  ) {
    super();
    this.collectionData = DefaultCollectionData();
  }

  ngOnInit(): void {
    if (!this.table) throw new Error('Table is not set');
    this.dataSubscription = this.dataService.subscribe(this.table, (value) => {
      this.collectionData = value;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.table) throw new Error('Table is not set');
    this.dataSubscription?.unsubscribe();
    this.dataSubscription = this.dataService.subscribe(this.table, (value) => {
      this.collectionData = value;
    });
  }

  update() {
    if (!this.table) throw new Error('Table is not set');
    this.dataService.update(this.table);
  }
  
  openDeleteScreen(item: TableItem[K]): void {
    if (!this.table) throw new Error('Table is not set');

    this.dialog.open<unknown, DeleteTableItemData<K>>(DeleteTableItemComponent, {
      data: {
        table: this.table,
        item: item,
      },
      width: 'calc(100% - 48px)',
      maxWidth: '450px',
      maxHeight: 'calc(100vh - 48px)',  
    });
  }

  openUpdateScreen(data: TableItem[K]): void {
    if (!this.table) throw new Error('Table is not set');

    if (this.table === 'planRepas') {
      this.dialog.open(UpdatePlanRepasComponent, {
        data,
        width: 'calc(100% - 48px)',
        maxWidth: '450px',
        maxHeight: 'calc(100vh - 48px)',  
      });
    } else {
      alert(`Update ${this.table} not implemented`);
    }
  }

  openAddScreen() {
    if (!this.table) throw new Error('Table is not set');

    if (this.table === 'planRepas') {
      this.dialog.open(AddPlanRepasComponent, {
        width: 'calc(100% - 48px)',
        maxWidth: '450px',
        maxHeight: 'calc(100vh - 48px)',  
      });
    } else {
      alert(`Add ${this.table} not implemented`);
    }
  }
}
