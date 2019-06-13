import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authservice: AuthService,  private routing:Router){}

  canActivate(): boolean {
    if(this.authservice.loggedIn()){
          return true
    }else{
      this.routing.navigate([''])
      return false;
    }
  }
  
}
