import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RideServiceService {
  apiUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }
  SearchRide(data:any){
    const url = `${this.apiUrl}/Ride/RideByFromDestination`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  AcceptRide(data:any){
    const url = `${this.apiUrl}/Ride/RideAccept`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  GetUpcomingRide(data:any){
    const url = `${this.apiUrl}/Ride/GetUpcomingRideById`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  CreateRide(data:any){
    const url = `${this.apiUrl}/Ride/RideRequest`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  RideConfirmByUser(data:any){
    const url = `${this.apiUrl}/Ride/RideConfirmByUser`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  GetAllUpcomingRides(data:any){
    const url = `${this.apiUrl}/Ride/AllUpcomingRides`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  GetAllRides(data:any){
    const url = `${this.apiUrl}/Ride/GetAllRides`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
}
