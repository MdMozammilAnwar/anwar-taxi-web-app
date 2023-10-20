import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
// import { HomeComponent } from './components/home/home.component';
// import { SignInComponent } from './components/sign-in/sign-in.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { AboutComponent } from './components/about/about.component';
// import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
