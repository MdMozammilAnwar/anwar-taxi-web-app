import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environment/environment';
import { UserRegisteration } from '../models/user-registeration';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl:string=environment.apiUrl
  constructor(private http:HttpClient) { }
  GetWelcome() {
    const url = `${this.apiUrl}/welcome`; // Replace with your API route
    return this.http.get(url);
  } 
  UserRegisteration(data:UserRegisteration){
    const url = `${this.apiUrl}/Registration/RegisterUser`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
  UserLogin(data:any){
    const url = `${this.apiUrl}/Registration/UserLogin`; // Replace with your API route
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }
}
