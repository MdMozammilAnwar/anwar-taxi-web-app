import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user = { email: '', password: '' };
  constructor(
    private http:HttpClient,
    private authService:AuthenticationService,
    private router: Router
    ){
      this.getWelcome();
  }
  getWelcome(){
    this.authService.GetWelcome().subscribe((data)=>{
      console.log("Data from server : "+JSON.stringify(data));
    },
    (error:HttpErrorResponse)=>{
      console.log("Error while fetching the welcome : "+error.message);
    })
  }
  onSubmit() {
    // Do something with the data, like sending it to a server or performing validation
    console.log("user login data: "+JSON.stringify(this.user));
    this.authService.UserLogin(this.user).subscribe(
        (res:any)=>{
          if(res){
            console.log("login User Data : "+JSON.stringify(res));
            // store the data and redirect the /home
            let role=res.user.role;
            if(role=="User"){
              this.router.navigate(['/user-dashboard'],{
                state: {
                  user: res.user
                },
              })
            }
            else if(role == "Driver"){
              this.router.navigate(['/driver-dashboard'],{
                state: {
                  user: res.user
                },
              })
            } 
            

          }
        },
        (err:HttpErrorResponse)=>{
            console.log("Error : "+err.message);
        }
        )
    
  }
}
