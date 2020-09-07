import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class ActivateGuard implements CanActivate
{
    constructor(private router: Router, private auth: AuthService){}
    

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree
    {
      if (this.auth.isAuthenticated())
        return true; 
      this.router.navigateByUrl('/login');
      return false;
    }

}
