import { Component } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected status: string | undefined;

  constructor(private apiService: ApiService) {
    this.getStatus()
      .subscribe((res) => this.status = res.status);
  }
  
  getStatus() {
    return this.apiService.getStatus();
  }
}
