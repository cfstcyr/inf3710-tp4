import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { s } from 'src/utils/url';
import { Client } from 'common/tables/client';
import { DataService } from 'src/services/data-service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected status: string | undefined;
  protected clients: Client[];
  protected clientsColumns: string[];

  constructor(private apiService: ApiService, private dataService: DataService) {
    this.clients = [];
    this.clientsColumns = [];
  }

  ngOnInit(): void {
    this.apiService.status()
      .subscribe((res) => this.status = res.status);

    this.dataService.getClients()
      .subscribe((clients) => {
        this.clients = clients;
        this.clientsColumns = clients.length > 0 ? Object.keys(clients[0]) : [];
      });
  }
}
