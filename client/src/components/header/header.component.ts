import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Display } from 'src/constants/helpers';
import { HelpersComponent } from '../helpers-component/helpers.component';

interface HeaderItem {
  title: string;
  path: string;
}

interface HeaderItemDisplay extends HeaderItem {
  active: boolean;
}

const HEADER_ITEMS: HeaderItem[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Settings',
    path: '/settings',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends HelpersComponent {
  protected items: HeaderItemDisplay[];

  constructor(private router: Router) {
    super();

    this.items = HEADER_ITEMS.map((item) => ({ ...item, active: false }));

    router.events.subscribe((event) => {
      this.items.forEach((item) => item.active = this.router.isActive(item.path, { paths: 'exact', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'exact' }));
    });
  }
}
