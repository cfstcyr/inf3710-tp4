import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { DataService } from 'src/services/data-service/data.service';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { Status } from 'common/communication/status';
import { PlanRepas } from 'common/tables/plan-repas';
import { DefaultResponseData, CollectionData } from 'src/utils/data';
import { Router } from '@angular/router';
import { DeletePlanRepasComponent } from '../delete-plan-repas/delete-plan-repas.component';
import { UpdatePlanRepasComponent } from '../update-plan-repas/update-plan-repas.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPlanRepasComponent } from '../add-plan-repas/add-plan-repas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent implements OnInit {
  protected planRepas: CollectionData<PlanRepas>
  public that = this

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService, 
    protected dataService: DataService, 
    private router: Router
  ) {
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
  
  openDeleteScreen(plan: PlanRepas): void {
    this.dialog.open(DeletePlanRepasComponent, {
      data: plan
    });
  }

  openUpdateScreen(plan: PlanRepas): void {
    this.dialog.open(UpdatePlanRepasComponent, {
      data: plan
    });
  }

  openAddScreen() {
    this.dialog.open(AddPlanRepasComponent);
  }
}
