import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispackagesComponent } from './dispackages/dispackages.component';
import { PackagegenComponent } from './packagegen/packagegen.component';
import { PackageComponent } from './package/package.component';
import { PatientComponent } from './patient/patient.component';
import { ProviderComponent } from './provider/provider.component';
import { HomeComponent } from './home/home.component';
import { ExpertComponent } from './expert/expert.component';

const routes: Routes = [
  //  { path: '', redirectTo: '/', pathMatch: 'full' },
   { path:'',component:HomeComponent},
   { path: 'dispackages' , component: DispackagesComponent },
   { path: 'packagegen' , component: PackagegenComponent },
   { path: 'package' , component: PackageComponent },
   { path: 'patient' , component: PatientComponent },
   { path: 'provider' , component: ProviderComponent },
   { path: 'expert', component: ExpertComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
