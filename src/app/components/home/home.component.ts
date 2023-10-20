import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RideServiceService } from 'src/app/services/ride-service.service';
import swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  paymentMode:string="";
  upcomingRide:any=[];
  createRideFromDes:string="";
  createRideToDes:string="";
  createRideDate:string="";
  inUserId:number=0;
  user:any;
  allConfimedRide:any;
  allRide:any=[];

  constructor(
    private rideService: RideServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
    ){
    this.paymentMode="Cash";
    
    const navigation = this.router.getCurrentNavigation();
    if(navigation){
      let state = navigation.extras.state as {
        user:any
      };
      if(state){
        localStorage.setItem("userInfo", JSON.stringify(state));
        this.inUserId=state.user.userId;
        this.user=state.user;
        console.log("user got : "+JSON.stringify(this.user));
      }
    }
  }
  ngOnInit(): void {
    this.getUpcomingRide();
    this.GetAllUpcomingRides();
    this.GetAllRide()
  }
  getUpcomingRide(){
    let objToGetUpcomingRide={
      userId:this.user.userId
      //userId:this.receivedDriverId
    }
    this.rideService.GetUpcomingRide(objToGetUpcomingRide).subscribe(
      (res:any)=>{
        if(res){
          // update the ucoming ride array
          if(res.success){
            this.upcomingRide=res.rideDetails
          }
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while retriving upcoming ride : "+err.message);
      }
    )
  }
  createRide(){
      let objToCreateRide={
        userId:this.user.userId,
        fromDestination:this.createRideFromDes,
        toDestination:this.createRideToDes,
        rideTime:this.createRideDate
      }
      this.showSpinner();
      this.rideService.CreateRide(objToCreateRide).subscribe(
        (res:any)=>{
          console.log("server response createRide() :: "+JSON.stringify(res));
          if(res){
            this.hideSpinner();
            if(res.success){
              // clean the variable once ride created
              this.GetAllRide();
              this.createRideFromDes="";
              this.createRideToDes="";
              this.createRideDate="";
              swal.fire(
                'Ride Created!',
                res.message,
                'success'
              );
            }
          }
        },
        (err:HttpErrorResponse)=>{
          console.log("Error while retriving upcoming ride : "+err.message);
        }
      )
  }
  bookNow(rideId:number){
    let objToBookNow={
      userId:this.user.userId,
      rideId:rideId,
      paymentMode:this.paymentMode
    }
    this.showSpinner();
    this.rideService.RideConfirmByUser(objToBookNow).subscribe((res:any)=>{
      if(res){
        this.hideSpinner();
        if(res.success){
          // lets clean the paymentMode
          this.getUpcomingRide();
          this.paymentMode="";
          swal.fire(
            'Ride Booked!',
            res.message,
            'success'
          );
        }
      }
    },(err:HttpErrorResponse)=>{
      console.log("Error while confirming ride by user: "+err.message);
    })
  }
  GetAllUpcomingRides(){
    let objToGetUpcomingRide={
      userId:this.user.userId
      //userId:this.receivedDriverId
    }
    this.rideService.GetAllUpcomingRides(objToGetUpcomingRide).subscribe(
      (res:any)=>{
        if(res){
          // update the ucoming ride array
          if(res.success){
            this.allConfimedRide=res.rideDetails
          }
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while retriving upcoming ride : "+err.message);
      }
    )
  }
  GetAllRide(){
    let objToGetUpcomingRide={
      userId:this.user.userId
    }
    this.rideService.GetAllRides(objToGetUpcomingRide).subscribe(
      (res:any)=>{
        if(res){
          // update the ucoming ride array
          if(res.success){
            this.allRide=res.rideDetails
          }
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while retriving upcoming ride : "+err.message);
      }
    )
  }
  showSpinner(){
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }
  hideSpinner(){
    this.spinner.hide();
  }
}
export class CreateRide{
  constructor(
    private fromDestination:string,
    private toDestination:string,
    private rideTime:any,
  ){}
}
