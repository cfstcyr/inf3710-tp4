import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from 'common/tables/plan-repas';
import { DataService } from 'src/services/data-service/data.service';

var defaultPlan: Omit<PlanRepas, 'idplanrepas'> = {
  categorie: 'végétarien',
  frequence: 2,
  nbrpersonne: 4,
  nbrcalorie: 1200,
  prix: 40,
  idfournisseur: 1
}

@Component({
  selector: 'app-add-plan-repas',
  templateUrl: './add-plan-repas.component.html',
  styleUrls: ['./add-plan-repas.component.scss']
})
export class AddPlanRepasComponent implements OnInit, OnChanges {
  planRepas: PlanRepas;
  formParameters: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPlanRepasComponent>,
    private dataService: DataService
  ) {
    this.planRepas = {idplanrepas: 1, ...defaultPlan};
    this.formParameters = new FormGroup({
      newCategorie: new FormControl(defaultPlan.categorie, [
          Validators.required,
      ]),
      newFrequence: new FormControl(defaultPlan.frequence, [
        Validators.required,
        Validators.min(0),
      ]),
      newNbrPersonnes: new FormControl(defaultPlan.nbrpersonne, [
        Validators.required,
        Validators.min(0),
      ]),
      newNbrCalories: new FormControl(defaultPlan.nbrcalorie, [
        Validators.required,
        Validators.min(0),
      ]),
      newPrix: new FormControl(defaultPlan.prix, [
        Validators.required,
        Validators.min(0),
      ]),
      newIdFournisseur: new FormControl(defaultPlan.idfournisseur, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formParameters.updateValueAndValidity();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async addPlanRepas(): Promise<void> {
    await this.dataService.addPlanRepas(
      {
        categorie: this.formParameters.get('newCategorie')?.value,
        frequence: this.formParameters.get('newFrequence')?.value,
        nbrpersonne: this.formParameters.get('newNbrPersonnes')?.value,
        nbrcalorie: this.formParameters.get('newNbrCalories')?.value,
        prix: this.formParameters.get('newPrix')?.value,
        idfournisseur: this.formParameters.get('newIdFournisseur')?.value
      }
    );
    this.dataService.update('planRepas');
    this.closeDialog();
  }

}
