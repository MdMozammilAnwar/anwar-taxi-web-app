import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';

export const SignInRoutes: Routes  = [
  {
    path: "",
    component: SignInComponent,
    data: {
      heading: "SignIn",
      breadcrumb: "SignIn",
      icon: "icofont-maximize bg-c-yellow",
    },
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SignInRoutes),
  ]
})
export class SignInModule { }
