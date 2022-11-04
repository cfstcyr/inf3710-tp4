import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from 'src/modules/material.module';
import { HomeComponent } from 'src/pages/home/home.component';

import { AppRoutingModule } from '../modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { AboutComponent } from 'src/pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from '../pages/settings/settings.component';
import { TableComponent } from 'src/components/table/table.component';
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    SettingsComponent,
    TableComponent,
    LoadingComponent
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
