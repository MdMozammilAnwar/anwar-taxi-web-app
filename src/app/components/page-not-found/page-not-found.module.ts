import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule, Routes } from '@angular/router';

export const PageNotFoundRoutes: Routes  = [
  {
    path: "",
    component: PageNotFoundComponent,
    data: {
      heading: "SignIn",
      breadcrumb: "SignIn",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PageNotFoundRoutes),
  ]
})
export class PageNotFoundModule { }
