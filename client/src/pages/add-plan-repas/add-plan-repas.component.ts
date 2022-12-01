import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'common/tables';
import { PlanRepas } from 'common/tables/plan-repas';
import { HelpersComponent } from 'src/components/helpers-component/helpers.component';
import { CATEGORIES } from 'src/constants/categories';
import { DataService } from 'src/services/data-service/data.service';
import { CollectionData } from 'src/utils/data';

var defaultPlan: Omit<PlanRepas, 'idplanrepas'> = {
  categorie: 'végétarien',
  frequence: 2,
  nbrpersonnes: 4,
  nbrcalories: 1200,
  prix: 40,
  idfournisseur: 1
}

@Component({
  selector: 'app-add-plan-repas',
  templateUrl: './add-plan-repas.component.html',
  styleUrls: ['./add-plan-repas.component.scss']
})
export class AddPlanRepasComponent extends HelpersComponent implements OnInit, OnChanges {
  fournisseurs?: CollectionData<Fournisseur>;
  formParameters: FormGroup;
  categories = CATEGORIES;

  constructor(
    public dialogRef: MatDialogRef<AddPlanRepasComponent>,
    private dataService: DataService
  ) {
    super();
    this.formParameters = new FormGroup({
      newCategorie: new FormControl(this.getRandomCategory(), [
        Validators.required,
      ]),
      newFrequence: new FormControl(defaultPlan.frequence, [
        Validators.required,
        Validators.min(1),
      ]),
      newNbrPersonnes: new FormControl(defaultPlan.nbrpersonnes, [
        Validators.required,
        Validators.min(1),
      ]),
      newNbrCalories: new FormControl(defaultPlan.nbrcalories, [
        Validators.required,
        Validators.min(1),
      ]),
      newPrix: new FormControl(defaultPlan.prix, [
        Validators.required,
        Validators.min(1),
      ]),
      newIdFournisseur: new FormControl(defaultPlan.idfournisseur, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  ngOnInit(): void {
    this.dataService.subscribe('fournisseur', (fournisseurs) => {
      this.fournisseurs = fournisseurs;
    });
    this.dataService.subscribe('planRepas', (plans) => {
      const currentCategories = plans.data.map(plan => plan.categorie);
      this.categories = [... new Set(currentCategories.concat(CATEGORIES))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    });
  }

  ngOnChanges(): void {
    this.formParameters.updateValueAndValidity();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async addPlanRepas(): Promise<void> {
    await this.dataService.insert(
      'planRepas',
      {
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

  private getRandomCategory(): string {
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  }
}
