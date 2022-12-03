import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableItem } from 'common/tables';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { getTableFromPath, TableItemConfig, TABLE_ITEMS } from 'src/config/data';

interface TableNameDisplay extends Omit<TableItemConfig<TableItem>, 'idKey'> {
  active: boolean;
}

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
  protected tableItemsHere: TableNameDisplay[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { 
    super();
    
    this.tableItemsHere = (Object.keys(this.tableItems) as (keyof TableItem)[]).map((item) => (
        { 
            path: TABLE_ITEMS[item]['path'], 
            name: TABLE_ITEMS[item]['name'],
            active: false 
        }
    ));
    console.log(this.tableItemsHere[2].path);
    console.log(this.router.isActive('data/' + this.tableItemsHere[2].path, { paths: 'subset', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' }));
    
    

    router.events.subscribe((event) => {
        console.log('hihi');
        console.log(this.router.isActive('data/' + this.tableItemsHere[2].path, { paths: 'subset', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' }));
        
        this.tableItemsHere.forEach((item) => item.active = this.router.isActive('data/' + item.path, { paths: 'subset', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' }));
        console.log(this.tableItemsHere);
    });
    
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
    console.log(this.tableItems);
    console.log(this.tableNames);
    
    
  }

}
