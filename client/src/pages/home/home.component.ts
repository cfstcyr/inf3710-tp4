import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { DataService } from 'src/services/data-service/data.service';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { Status } from 'common/communication/status';
import { PlanRepas } from 'common/tables/plan-repas';
import { DefaultResponseData, CollectionData } from 'src/utils/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponCollectionDataHelpersComponent implements OnInit {
  protected planRepas: ResponseData<PlanRepas>

  constructor(private apiService: ApiService, protected dataService: DataService, private router: Router) {
    super();
    this.planRepas = DefaultResponseData();
  }

  ngOnInit(): void {
    this.dataService.subscribe('planRepas', (planRepas) => {
      this.planRepas = planRepas;
    });
  }

  update(): void {
    this.dataService.update('planRepas');
  }

  redirect(newPage: string): void {
    this.router.navigateByUrl(newPage);
  }
  
  log(a: any) {
    console.log(a);
  }
}
