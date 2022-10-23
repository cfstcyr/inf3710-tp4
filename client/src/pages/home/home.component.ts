import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { s } from 'src/utils/url';
import { Client } from 'common/tables/client';
import { DataService } from 'src/services/data-service/data.service';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { Status } from 'common/communication/status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent implements OnInit {
  protected status: Status | undefined;
  protected clients: Client[];
  protected clientsColumns: string[];

  constructor(private apiService: ApiService, protected dataService: DataService) {
    super();
    this.clients = [];
    this.clientsColumns = [];
  }

  ngOnInit(): void {
    this.apiService.status()
      .subscribe((res) => this.status = res);

    this.dataService.subscribeClients((clients) => {
      this.clients = clients;
      this.clientsColumns = clients.length > 0 ? Object.keys(clients[0]) : [];
    });
  }
}
