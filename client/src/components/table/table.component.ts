import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() items: object[];

  constructor() {
    this.items = [];
  }

  protected getColumns(): string[] {
    return this.items.length > 0 ? Object.keys(this.items[0]) : [];
  }
}
