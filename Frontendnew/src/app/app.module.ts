import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyMaterialModule } from  './material.module';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {SessionStorageService} from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DispackagesComponent } from './dispackages/dispackages.component';
import { PackagegenComponent } from './packagegen/packagegen.component';
import { PackageComponent } from './package/package.component';
import { PatientComponent } from './patient/patient.component';
import { ProviderComponent } from './provider/provider.component';
import {UserService} from './shared/service/user.service';
import { HomeComponent } from './home/home.component';
import { ExpertComponent } from './expert/expert.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DispackagesComponent,
    PackagegenComponent,
    PackageComponent,
    PatientComponent,
    ProviderComponent,
    HomeComponent,
    ExpertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MyMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserService,SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
