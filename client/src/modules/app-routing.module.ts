import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPageComponent } from 'src/pages/data-page/data-page.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';
import { SettingsComponent } from 'src/pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'data/:table', component: DataPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
