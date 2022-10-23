import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { DataService } from 'src/services/data-service/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends HelpersComponent implements OnInit {
  protected resetScript: string | undefined;

  constructor(private dataService: DataService, private snackbar: MatSnackBar) { 
    super();
  }

  ngOnInit(): void {
    this.dataService.getResetScript()
      .subscribe(({ script }) => this.resetScript = script.trim());
  }

  protected reset() {
    if (confirm('Reset database? All date will be erased and mock data will be inserted.')) {
      this.dataService.reset()
        .pipe(
          catchError((err: Error) => {
            this.snackbar.open('Error while trying to reset database.', undefined, { duration: 2000 });
            return throwError(() => err);
          }),
        )
        .subscribe(() => {
          this.snackbar.open('Database was reset.', undefined, { duration: 2000 });
        });
    }
  }
}
