import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashboardComponent } from './driver-dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


export const DriverRoutes: Routes  = [
  {
    path: "",
    component: DriverDashboardComponent,
    data: {
      heading: "Driver Dashboard",
      breadcrumb: "Driver Dashboard",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];

@NgModule({
  declarations: [DriverDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DriverRoutes),
    NgxSpinnerModule
  ]
})
export class DriverDashboardModule { }
