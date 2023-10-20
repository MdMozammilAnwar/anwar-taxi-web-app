import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserRegisteration } from 'src/app/models/user-registeration';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  
})
export class SignUpComponent {
  constructor(private http:HttpClient,
              private authService:AuthenticationService, 
              private spinner:NgxSpinnerService,
              private router: Router,
              ){
   //this.showSpinner();
  }
  user: UserRegisteration = new User(); // Initialize the User model

  onSubmit() {
    // Access the form data from the user object
    console.log('User Data:', this.user);
    // You can send this data to an API or perform other actions here.
    
    this.authService.UserRegisteration(this.user).subscribe(
      (res:any)=>{
        console.log("user register db data :"+JSON.stringify(res));
        if(res){
            if(res.success){
              this.router.navigate(['/signin'])
              swal.fire(
                'Registration Success!',
                res.message,
                'success'
              );
            }
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error Message : "+err.message)
      })
  }
  showSpinner() {
    console.log("Show Spinner called...");
    this.spinner.show();
    setTimeout(() => {
      //   spinner ends after 15 seconds
      this.hideSpinner();
    }, 15000);
  }

  hideSpinner() {
    console.log("Hide Spinner called...");
    this.spinner.hide();
  }
  

}
