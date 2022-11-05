import { Component, Input } from '@angular/core';
import { CollectionData } from 'src/utils/data';
import { HelpersComponent } from '../helpers-component/helpers.component';

interface TableButtonBase {
  action?: (value: object) => void;
  disabled?: boolean | ((value: object) => boolean);
}

interface TableButtonText extends TableButtonBase {
  text: string;
  icon?: string;
}

interface TableButtonIcon extends TableButtonBase {
  text?: string;
  icon: string;
}

export type TableButton = TableButtonText | TableButtonIcon;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends HelpersComponent {
  protected ACTION_COLUMN = '&&ACTION-COLUMN&&';
  @Input() items: object[] | CollectionData<object>;
  @Input() buttons: TableButton[];

  constructor() {
    super();
    this.items = [];
    this.buttons = [];
  }

  protected getItems(): object[] {
    return Array.isArray(this.items) ? this.items : this.items.data;
  }

  protected getColumns(): string[] {
    const cols = this.getItems().length > 0 ? Object.keys(this.getItems()[0]) : [];

    if (this.buttons.length > 0) cols.push(this.ACTION_COLUMN);

    return cols;
  }

  protected getUpdated(): string | undefined {
    return Array.isArray(this.items) ? undefined : String(this.items.updated);
  }

  protected isDisabled(button: TableButton, value: object): boolean {
    switch (typeof button.disabled) {
      case 'boolean':
        return button.disabled;
      case 'function':
        return button.disabled(value);
      default:
        return false;
    }
  }
}
