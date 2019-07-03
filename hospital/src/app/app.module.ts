import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FileSelectDirective } from 'ng2-file-upload';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientLoginComponent } from './doctor/patient-login/patient-login.component';
import { PatientAuthGaurdService } from './patient-auth-gaurd.service';
import { PatientAuthService } from './patient-auth.service';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { PatientComponent } from './doctor/patient/patient.component';
import { PatientProfileComponent } from './doctor/patient/patient-profile/patient-profile.component';
import { PatientDataComponent } from './doctor/patient/patient-data/patient-data.component';
import { PatientUploadComponent } from './doctor/patient/patient-upload/patient-upload.component';
import { combineLatest, from } from 'rxjs';
import { PatientLogoutComponent } from './doctor/patient-logout/patient-logout.component';
import { DoctorService } from './services/doctor.service';
import { PatientService } from './services/patient.service';
import { SearchRecordComponent } from './doctor/patient/search-record/search-record.component';
import { PatientViewComponent } from './patient-view/patient-view.component';



var appRoutes: Routes = [
{ path:'', component:HomeComponent },
{ path:'login', component: LoginComponent },
{ path:'logout', canActivate:[AuthGuardService], component: LogoutComponent },
{ path:'doctor', canActivate:[AuthGuardService], component:DoctorComponent, children:[
  { path: '', component: DoctorProfileComponent },
  { path:'login', component: PatientLoginComponent }
  ] },
{ path: 'patientView', component: PatientViewComponent },
{ path: 'patient',canActivate: [ PatientAuthGaurdService ], component: PatientComponent, children:[
    { path: '', component: PatientProfileComponent},
    { path: 'data', component: PatientDataComponent },
    { path: 'upload', component: PatientUploadComponent },
    { path: 'search', component: SearchRecordComponent },
    { path: 'logout', component: PatientLogoutComponent }
]}
]

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    DoctorComponent,
    PatientLoginComponent,
    DoctorProfileComponent,
    PatientComponent,
    PatientProfileComponent,
    PatientDataComponent,
    PatientUploadComponent,
    PatientLogoutComponent,
    SearchRecordComponent,
    PatientViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule
  ],
  providers: [ AuthGuardService,
               AuthService,
               PatientAuthGaurdService,
               PatientAuthService,
               DoctorService,
               PatientService,
               CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
