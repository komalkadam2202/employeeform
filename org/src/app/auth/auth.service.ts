import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private routing:Router) { }
  registeruser(value){
    console.log('service call',value);
    return this.http.post('http://localhost:3500/register', value)
  }
  
  loginuser(value){
      return this.http.post('http://localhost:3500/login', value);
  }

  forgotpass(email){
    return this.http.post('http://localhost:3500/forgot', email);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token')
    this.routing.navigate([''])
  }

  resetpass(id,password){
    return this.http.put('http://localhost:3500/reset/' +`${id}`,password)
  }

  resendemail(id){
    return this.http.post('http://localhost:3500/resendemail' + `/${id}`);
  }
  
  // +`${id}`
  getToken(){
    return localStorage.getItem('token')
  }
}
