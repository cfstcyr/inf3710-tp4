import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api-service/api.service';
import { DataService } from 'src/services/data-service/data.service';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { Status } from 'common/communication/status';
import { PlanRepas } from 'common/tables/plan-repas';
import { DefaultCollectionData, CollectionData } from 'src/utils/data';
import { Router } from '@angular/router';
import { UpdatePlanRepasComponent } from '../update-plan-repas/update-plan-repas.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPlanRepasComponent } from '../add-plan-repas/add-plan-repas.component';
import { TABLE_ITEMS } from 'src/config/data';
import { AlertManagerService } from 'src/services/alert-manager/alert-manager.service';
import { DeleteTableItemComponent, DeleteTableItemData } from '../delete-table-item/delete-table-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HelpersComponent implements OnInit {
  protected planRepas: CollectionData<PlanRepas>;
  protected tableItems = Object.values(TABLE_ITEMS);
  public that = this;

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService, 
    protected dataService: DataService, 
    private router: Router,
    private alertManager: AlertManagerService,
  ) {
    super();
    this.planRepas = DefaultCollectionData();
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
    this.dialog.open<unknown, DeleteTableItemData<'planRepas'>>(DeleteTableItemComponent, {
      data: {
        table: 'planRepas',
        item: plan,
      },
      width: 'calc(100% - 48px)',
      maxWidth: '450px',
      maxHeight: 'calc(100vh - 48px)',
    });
  }

  openUpdateScreen(plan: PlanRepas): void {
    this.dialog.open(UpdatePlanRepasComponent, {
      data: plan,
      width: 'calc(100% - 48px)',
      maxWidth: '450px',
      maxHeight: 'calc(100vh - 48px)',
    });
  }

  openAddScreen() {
    this.dialog.open(AddPlanRepasComponent, {
      width: 'calc(100% - 48px)',
      maxWidth: '450px',
      maxHeight: 'calc(100vh - 48px)',
    });
  }
}
