import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AlertComponent } from 'src/components/alert/alert.component';
import { Alert, AlertManagerService } from 'src/services/alert-manager/alert-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'inf3710-tp4';

  private $destroy: Subject<boolean>;

  constructor(private readonly alertManager: AlertManagerService, private readonly snackbar: MatSnackBar) {
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.alertManager.subscribe(this.alert.bind(this), this.$destroy);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  alert(alert: Alert) {
    this.snackbar.openFromComponent(AlertComponent, {
      duration: 2000,
      data: alert,
    });
  }
}
