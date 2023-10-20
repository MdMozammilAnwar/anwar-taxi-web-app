import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';

export const SignUpRoutes: Routes  = [
  {
    path: "",
    component: SignUpComponent,
    data: {
      heading: "SignIn",
      breadcrumb: "SignIn",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SignUpRoutes),
  ]
})
export class SignUpModule { }
