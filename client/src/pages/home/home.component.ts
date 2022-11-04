import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { DataService } from 'src/services/data-service/data.service';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { Status } from 'common/communication/status';
import { PlanRepas } from 'common/tables/plan-repas';
import { DefaultResponseData, ResponseData } from 'src/utils/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent implements OnInit {
  protected status: Status | undefined;
  protected planRepas: ResponseData<PlanRepas>

  constructor(private apiService: ApiService, protected dataService: DataService) {
    super();
    this.planRepas = DefaultResponseData();
  }

  ngOnInit(): void {
    this.apiService.status()
      .subscribe((res) => this.status = res);

    this.dataService.subscribe('planRepas', (planRepas) => {
      this.planRepas = planRepas;
    });
  }

  update(): void {
    this.dataService.update('planRepas');
  }
}
