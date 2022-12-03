import { Component, OnInit } from '@angular/core';
import { Display } from 'src/constants/helpers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
Display: any;

  constructor() { }

  ngOnInit(): void {
  }

}
