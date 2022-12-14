import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QueryScript } from 'common/communication/query-script';
import { catchError, throwError } from 'rxjs';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { AlertManagerService } from 'src/services/alert-manager/alert-manager.service';
import { DataService } from 'src/services/data-service/data.service';
import { ScriptService } from 'src/services/script-service/script.service';

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

  constructor(private scriptService: ScriptService, private alertManager: AlertManagerService) { 
    super();
    this.queryScripts = [];
  }

  ngOnInit(): void {
    this.scriptService.getResetScript()
      .subscribe(({ script }) => this.resetScript = script.trim());
  }

  protected async reset() {
    if (confirm('Reset database? All data will be erased and mock data will be inserted.')) {
      try {
        await this.scriptService.reset();
        this.alertManager.info(`Database reset.`);
      } catch (e) {
        this.alertManager.error(`Error while updating database`);
        console.error(e);
      }
    }
  }
}
