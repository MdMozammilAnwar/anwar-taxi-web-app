import { Component, OnInit } from '@angular/core';
import { RideServiceService } from '../../services/ride-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RideFound } from '../../models/IRideFound';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit{
  riderArray2=null;
  paymentMode:string="";
  rideFound:string="";
  searchDest:string=""
  rideFoundList:RideFound[]=[];
  rideToAccept:any;
  rideClicked:boolean=false;
  rideTimeByDriver:any;
  fareByDriver:any;
  receivedDriverId:number=0;
  upcomingRide:any=[];
  allRide:any=[];
  driver:any;
  allConfimedRide:any;
  constructor(private rideService:RideServiceService,private router: Router){
    this.paymentMode="Cash"
    const navigation = this.router.getCurrentNavigation();
    if(navigation){
      let state = navigation.extras.state as {
        user:any
      };
      if(state){
        localStorage.setItem("driverInfo", JSON.stringify(state));
        this.driver=state.user;
        console.log("user got : "+JSON.stringify(this.driver));
      }
    }
  }
  ngOnInit(): void {
    this.getUpcomingRide();
    this.GetAllUpcomingRides();
    this.GetAllRide();
  }
  searchRide(){
    console.log("ride called" + this.searchDest);
    let objToSearchRide={
      fromDestination:this.searchDest
    }
    this.rideService.SearchRide(objToSearchRide).subscribe(
      (res:any)=>{
        if(res.success){
          this.rideFoundList=res.rideDetails;
          console.log("found ride from DB : "+JSON.stringify(this.rideFoundList));
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while searching ride : "+err.message);
      })
  }
  passRideDataToAccept(ride:RideFound){
    this.rideClicked=true;
    this.rideToAccept=ride;
  }
  acceptRide(in_user_id:number,in_ride_id:number){
    // prepare the object to make the DB call
    this.rideClicked=false;
    let objToAcceptRide={
      userId:this.driver.userId,
      rideId:in_ride_id,
      rideTimeByDriver:this.rideTimeByDriver,
      rideFare:this.fareByDriver
    }
    this.rideService.AcceptRide(objToAcceptRide).subscribe(
      (res:any)=>{
        if(res){
          if(res.success){
            swal.fire(
              'Ride Accepted!',
              res.message,
              'success'
            );
          }
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while accepting ride : "+err.message);
      }
      )
  }

  GetAllUpcomingRides(){
    let objToGetUpcomingRide={
      userId:this.driver.userId
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
  getUpcomingRide(){
    let objToGetUpcomingRide={
      userId:this.driver.userId
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
  GetAllRide(){
    let objToGetUpcomingRide={
      userId:this.driver.userId
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

