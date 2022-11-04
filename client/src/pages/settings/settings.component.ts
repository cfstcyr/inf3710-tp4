import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QueryScript } from 'common/communication/query-script';
import { catchError, throwError } from 'rxjs';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { DataService } from 'src/services/data-service/data.service';

interface Result {
  data: object[];
  columns: string[];
}

interface QueryScriptDisplay extends QueryScript {
  result: undefined | Result;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends HelpersComponent implements OnInit {
  protected resetScript: string | undefined;
  protected queryScripts: QueryScriptDisplay[];

  constructor(private dataService: DataService, private snackbar: MatSnackBar) { 
    super();
    this.queryScripts = [];
  }

  ngOnInit(): void {
    // this.dataService.getResetScript()
    //   .subscribe(({ script }) => this.resetScript = script.trim());

    // const queryScriptSubscription = this.dataService.subscribeQueryScripts((queryScripts) => {
    //   this.queryScripts = queryScripts.map<QueryScriptDisplay>(q => ({ ...q, result: undefined }));
    //   queryScriptSubscription.unsubscribe();
    // });
  }

  // protected reset() {
  //   if (confirm('Reset database? All date will be erased and mock data will be inserted.')) {
  //     this.dataService.reset()
  //       .pipe(
  //         catchError((err: Error) => {
  //           this.snackbar.open('Error while trying to reset database.', undefined, { duration: 2000 });
  //           return throwError(() => err);
  //         }),
  //       )
  //       .subscribe(() => {
  //         this.snackbar.open('Database was reset.', undefined, { duration: 2000 });
  //       });
  //   }
  // }

  // protected executeScript(number: string) {
  //   this.dataService
  //     .executeQueryScript(number)
  //     .pipe(
  //       catchError((e) => {
  //         this.snackbar.open('Error while trying to execute script.', undefined, { duration: 2000 });
  //         return throwError(() => e);
  //       }),
  //     )
  //     .subscribe((data) => {
  //       const index = this.queryScripts.findIndex(({ number: n }) => number === n);

  //       this.queryScripts[index].result = {
  //         data,
  //         columns: data.length > 0 ? Object.keys(data[0]) : [],
  //       };
  //     });
  // }
}
