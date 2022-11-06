import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableItem } from 'common/tables';
import { Subject } from 'rxjs';
import { DeleteTableItemComponent, DeleteTableItemData } from 'src/pages/delete-table-item/delete-table-item.component';
import { DataService } from 'src/services/data-service/data.service';
import { CollectionData, DefaultCollectionData } from 'src/utils/data';
import { HelpersComponent } from '../helpers-component/helpers.component';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent<K extends keyof TableItem> extends HelpersComponent implements OnInit {
  @Input() table?: K;
  protected collectionData: CollectionData<TableItem[K]>;
  protected that = this;

  constructor(
    private dialog: MatDialog, 
    private readonly dataService: DataService,
  ) {
    super();
    this.collectionData = DefaultCollectionData();
  }

  ngOnInit(): void {
    if (!this.table) throw new Error('Table is not set');
    this.dataService.subscribe(this.table, (value) => {
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
      width: 'calc(100% - 24px)',
      maxWidth: '450px',
    });
  }

  openUpdateScreen(data: TableItem[K]): void {
    console.log('update', data);
    // this.dialog.open(UpdatePlanRepasComponent, {
    //   data: plan
    // });
  }

  openAddScreen() {
    console.log('add');
    // this.dialog.open(AddPlanRepasComponent);
  }
}
