import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const AboutRoutes: Routes  = [
  {
    path: "",
    component: AboutComponent,
    data: {
      heading: "My About",
      breadcrumb: "My About",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AboutRoutes),
  ]
})
export class AboutModule { }
