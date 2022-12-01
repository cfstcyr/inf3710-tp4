import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableItem } from 'common/tables';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { getTableFromPath, TABLE_ITEMS } from 'src/config/data';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent<K extends keyof TableItem> extends HelpersComponent implements OnInit {
  protected table?: keyof TableItem;
  protected name?: string;
  protected tableItems = TABLE_ITEMS;
  protected tableNames: (keyof TableItem)[] = Object.keys(TABLE_ITEMS) as (keyof TableItem)[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { 
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      try {
        this.table = getTableFromPath(params['table']);        
        this.name = TABLE_ITEMS[this.table].name;
      } catch (e) {
        this.router.navigateByUrl('/404', { replaceUrl: true });
      }
    });
  }

}
