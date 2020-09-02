import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IDtoUserData } from './dto-user-data';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ActivateGuard implements CanActivate
{
    constructor(private router: Router){
        
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree
    {
      var currentUser : IDtoUserData;
      currentUser = JSON.parse (localStorage.getItem('currentUser')); 
      if (currentUser != null && currentUser.id > 0)
        return true;
      
      this.router.navigateByUrl('/login');
      return false;
    }

}
