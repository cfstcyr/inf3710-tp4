import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Alert } from 'src/services/alert-manager/alert-manager.service';
import { HelpersComponent } from '../helpers-component/helpers.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends HelpersComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) protected alert: Alert
  ) {
    super();
  }

  getIconColor(): string | undefined {
    switch (this.alert.type) {
      case 'error':
        return 'tomato';
      case 'info':
        return undefined;
      case 'warn':
        return 'Gold';
    }
  }

}
