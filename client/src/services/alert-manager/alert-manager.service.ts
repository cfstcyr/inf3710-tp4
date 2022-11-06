import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

export interface Alert {
  message: string;
  icon?: string;
  type: 'error' | 'warn' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {
  private subject: Subject<Alert>;

  constructor() {
    this.subject = new Subject();
  }

  subscribe(next: (alert: Alert) => void, $destroy?: Subject<boolean>): Subscription {
    let s: Observable<Alert> = this.subject;

    if ($destroy) s = s.pipe(takeUntil($destroy));

    return s.subscribe(next);
  }

  info(message: string, icon?: string) {
    this.subject.next({ message, icon, type: 'info' });
  }

  warn(message: string, icon?: string) {
    this.subject.next({ message, icon, type: 'warn' });
  }

  error(message: string, icon?: string) {
    this.subject.next({ message, icon, type: 'error' });
  }
}
