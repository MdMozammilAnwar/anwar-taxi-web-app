import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

export const HomeRoutes: Routes  = [
  {
    path: "",
    component: HomeComponent,
    data: {
      heading: "My Home",
      breadcrumb: "My Home",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(HomeRoutes),
    NgxSpinnerModule
  ]
})
export class HomeModule { }
