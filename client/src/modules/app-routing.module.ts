import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPageComponent } from 'src/pages/data-page/data-page.component';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';
import { SettingsComponent } from 'src/pages/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/data/plan-repas', pathMatch: 'full'},
  { path: 'settings', component: SettingsComponent },
  { path: 'data/:table', component: DataPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
