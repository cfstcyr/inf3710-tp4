import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from 'common/tables/plan-repas';
import { DataService } from 'src/services/data-service/data.service';

@Component({
  selector: 'app-delete-plan-repas',
  templateUrl: './delete-plan-repas.component.html',
  styleUrls: ['./delete-plan-repas.component.scss']
})
export class DeletePlanRepasComponent implements OnInit {
  planRepas: PlanRepas;

  constructor(
    public dialogRef: MatDialogRef<DeletePlanRepasComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: PlanRepas,
  ) { 
    this.planRepas = data;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async deletePlanRepas(): Promise<void> {
    await this.dataService.delete('planRepas', this.planRepas.idplanrepas);
    this.dataService.update('planRepas');
    this.closeDialog();
  }
}
