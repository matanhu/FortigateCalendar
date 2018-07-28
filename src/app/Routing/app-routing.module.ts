import { Routes, RouterModule } from '@angular/router';
import { CalendarComponentComponent } from '../components/calendar-component/calendar-component.component';
import { NgModule } from '@angular/core';
import { CalendarPageComponent } from '../pages/calendar-page/calendar-page.component';
import { NewInstallationPageComponent } from '../pages/new-installation-page/new-installation-page.component';

const routes: Routes = [
  { path: '', component: CalendarPageComponent, pathMatch: 'full' },
  { path: 'newInstallation/:installDate', component: NewInstallationPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
