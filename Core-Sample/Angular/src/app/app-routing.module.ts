import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AboutComponent } from './component/about/about.component';
import { LookupComponent } from './component/lookup-component/lookup.component';
import { DevicesComponent } from './component/devices/devices.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'lookup', component: LookupComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
