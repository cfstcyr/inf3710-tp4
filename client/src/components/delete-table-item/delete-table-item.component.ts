import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableItem } from 'common/tables';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { TABLE_ITEMS } from 'src/config/data';
import { DataService } from 'src/services/data-service/data.service';

export interface DeleteTableItemData<K extends keyof TableItem> {
  table: K,
  item: TableItem[K],
}

@Component({
  selector: 'app-delete-table-item',
  templateUrl: './delete-table-item.component.html',
  styleUrls: ['./delete-table-item.component.scss']
})
export class DeleteTableItemComponent<K extends keyof TableItem> extends HelpersComponent implements OnInit {
  private table: K;
  protected tableName: string;
  protected idKey: keyof TableItem[K];
  protected item: TableItem[K];
  
  constructor(
    private dialogRef: MatDialogRef<DeleteTableItemComponent<K>>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) private data: DeleteTableItemData<K>,
  ) {
    super();
    this.table = data.table;
    this.tableName = TABLE_ITEMS[this.table].name;
    this.idKey = TABLE_ITEMS[this.table].idKey;
    this.item = data.item;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  async deleteItem(): Promise<void> {
    const idKey = TABLE_ITEMS[this.table].idKey;
    await this.dataService.delete(this.table, +this.item[idKey]);
    this.dataService.update(this.table);
    this.close();
  }
}
