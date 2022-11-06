import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from 'common/tables/plan-repas';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { DataService } from 'src/services/data-service/data.service';
import { AddPlanRepasComponent } from '../add-plan-repas/add-plan-repas.component';

@Component({
  selector: 'app-update-plan-repas',
  templateUrl: './update-plan-repas.component.html',
  styleUrls: ['./update-plan-repas.component.scss']
})
export class UpdatePlanRepasComponent extends HelpersComponent implements OnInit {
  planRepas: PlanRepas;
  formParameters: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPlanRepasComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: PlanRepas,
  ) {
    super();
    this.planRepas = data;

    this.formParameters = new FormGroup({
      newCategorie: new FormControl(this.planRepas.categorie, [
          Validators.required,
      ]),
      newFrequence: new FormControl(this.planRepas.frequence, [
        Validators.required,
        Validators.min(1),
      ]),
      newNbrPersonnes: new FormControl(this.planRepas.nbrpersonnes, [
        Validators.required,
        Validators.min(1),
      ]),
      newNbrCalories: new FormControl(this.planRepas.nbrcalories, [
        Validators.required,
        Validators.min(1),
      ]),
      newPrix: new FormControl(this.planRepas.prix, [
        Validators.required,
        Validators.min(1),
      ]),
      newIdFournisseur: new FormControl(this.planRepas.idfournisseur, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formParameters.markAllAsTouched();
    this.formParameters.updateValueAndValidity();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async updatePlanRepas(): Promise<void> {
    await this.dataService.patch(
      'planRepas',
      this.planRepas.idplanrepas,
      {
        idplanrepas: this.planRepas.idplanrepas,
        categorie: this.formParameters.get('newCategorie')?.value,
        frequence: this.formParameters.get('newFrequence')?.value,
        nbrpersonnes: this.formParameters.get('newNbrPersonnes')?.value,
        nbrcalories: this.formParameters.get('newNbrCalories')?.value,
        prix: this.formParameters.get('newPrix')?.value,
        idfournisseur: this.formParameters.get('newIdFournisseur')?.value
      }
    );
    this.dataService.update('planRepas');
    this.closeDialog();
  }
}
