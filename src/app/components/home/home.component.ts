import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RideServiceService } from 'src/app/services/ride-service.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  riderArray2=null;
  paymentMode:string="";
  upcomingRide:any=[];
  createRideFromDes:string="";
  createRideToDes:string="";
  createRideDate:string="";
  inUserId:number=0;
  user:any;
  allConfimedRide:any;
  allRide:any=[];

  constructor(private rideService: RideServiceService,private router: Router){
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
      this.rideService.CreateRide(objToCreateRide).subscribe(
        (res:any)=>{
          console.log("server response createRide() :: "+JSON.stringify(res));
          if(res){
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
    this.rideService.RideConfirmByUser(objToBookNow).subscribe((res:any)=>{
      if(res){
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
  riderArray= [
    {
        "rideId": 2,
        "userId": 1,
        "userName": "John Doe",
        "userEmail": "john.doe@example.com",
        "userMobile": "555-123-4567",
        "fromDestination": "Hyderabad",
        "toDestination": "Chennai",
        "rideTimeByUser": "2023-10-28 07:00:00",
        "status": 2,
        "createdBy": 1,
        "createdOn": "2023-10-18 15:39:32.054527"
    },
    {
        "rideId": 3,
        "userId": 3,
        "userName": "Sonal Shah",
        "userEmail": "sonal@example.com",
        "userMobile": "555-123-4567",
        "fromDestination": "Hyderabad",
        "toDestination": "Chennai",
        "rideTimeByUser": "2023-12-28 07:00:00",
        "status": 2,
        "createdBy": 3,
        "createdOn": "2023-10-18 15:45:33.979275"
    },
    {
        "rideId": 5,
        "userId": 1,
        "userName": "John Doe",
        "userEmail": "john.doe@example.com",
        "userMobile": "555-123-4567",
        "fromDestination": "Hyderabad",
        "toDestination": "Mumbai",
        "rideTimeByUser": "2023-12-08 07:00:00",
        "status": 2,
        "createdBy": 1,
        "createdOn": "2023-10-19 06:48:26.257907"
    }
];
}
export class CreateRide{
  constructor(
    private fromDestination:string,
    private toDestination:string,
    private rideTime:any,
  ){}
}
