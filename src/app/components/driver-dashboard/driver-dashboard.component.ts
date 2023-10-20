import { Component, OnInit } from '@angular/core';
import { RideServiceService } from '../../services/ride-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RideFound } from '../../models/IRideFound';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit{
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
  isRideFound:boolean=true;
  constructor(
      private rideService:RideServiceService,
      private router: Router,
      private spinner:NgxSpinnerService
      ){
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
    this.showSpinner();
    this.rideService.SearchRide(objToSearchRide).subscribe(
      (res:any)=>{
        console.log("res search : "+JSON.stringify(res));
        this.hideSpinner();
        if(res.success){
          this.rideFoundList=res.rideDetails;
          console.log("found ride from DB : "+JSON.stringify(this.rideFoundList));
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Error while searching ride : "+err.message);
        this.isRideFound=false;
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
    this.showSpinner();
    this.rideService.AcceptRide(objToAcceptRide).subscribe(
      (res:any)=>{
        if(res){
          this.hideSpinner();
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
        console.log("Get All ride from server : "+JSON.stringify(res));
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

