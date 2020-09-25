import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styles: [ ".width40 {width:40%}", 
            ".width35 {width:35%}", 
            ".width25 {width:25%}", 
            ".current-user-span {display:block; padding:0px}" ,
            ".current-user-link {margin-left:5px; text-align: center;}"
          ]
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(public auth: AuthService, private router:Router)  {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout()
  {
    this.auth.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/home');
  }

}
