import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from 'src/modules/material.module';
import { HomeComponent } from 'src/pages/home/home.component';

import { AppRoutingModule } from '../modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from '../pages/settings/settings.component';
import { TableComponent } from 'src/components/table/table.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { AddPlanRepasComponent } from '../pages/add-plan-repas/add-plan-repas.component';
import { UpdatePlanRepasComponent } from '../pages/update-plan-repas/update-plan-repas.component';
import { DeletePlanRepasComponent } from '../pages/delete-plan-repas/delete-plan-repas.component';
import { TableWrapperComponent } from 'src/components/table-wrapper/table-wrapper.component';
import { DataPageComponent } from 'src/pages/data-page/data-page.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SettingsComponent,
    TableComponent,
    LoadingComponent,
    AddPlanRepasComponent,
    UpdatePlanRepasComponent,
    DeletePlanRepasComponent,
    TableWrapperComponent,
    DataPageComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
