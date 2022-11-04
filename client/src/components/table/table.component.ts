import { Component, Input } from '@angular/core';
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
  @Input() items: object[];
  @Input() buttons: TableButton[];

  constructor() {
    super();
    this.items = [];
    this.buttons = [];
  }

  protected getColumns(): string[] {
    const cols = this.items.length > 0 ? Object.keys(this.items[0]) : [];

    if (this.buttons.length > 0) cols.push(this.ACTION_COLUMN);

    return cols;
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
