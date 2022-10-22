import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { s } from 'src/utils/url';
import { Client } from 'common/tables/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected status: string | undefined;
  protected clients: Client[];
  protected clientsColumns: string[];

  constructor(private apiService: ApiService, private httpClient: HttpClient) {
    this.clients = [];
    this.clientsColumns = [];
  }

  ngOnInit(): void {
    this.getStatus()
      .subscribe((res) => this.status = res.status);

      this.httpClient.get<Client[]>(s('/user')).subscribe((clients) => {
        this.clients = clients;
        this.clientsColumns = clients.length > 0 ? Object.keys(clients[0]) : [];

        console.log(this.clients, this.clientsColumns);
      });
  }
  
  getStatus() {
    return this.apiService.getStatus();
  }
}
