import { Component } from '@angular/core';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent {}
