import { Component, Input } from '@angular/core';
import { ResponseData } from 'src/utils/data';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() loading: boolean | ResponseData<unknown> = false;

  isLoading(): boolean {
    return typeof this.loading === 'boolean' 
      ? this.loading
      : this.loading.data.length === 0 && this.loading.loading;
  }
}
