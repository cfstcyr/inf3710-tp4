import { Component } from '@angular/core';
import { TableItem } from 'common/tables';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { TABLE_ITEMS } from 'src/config/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent {
  protected tableItems = TABLE_ITEMS;
  protected tableNames: (keyof TableItem)[] = Object.keys(TABLE_ITEMS) as (keyof TableItem)[];
}
