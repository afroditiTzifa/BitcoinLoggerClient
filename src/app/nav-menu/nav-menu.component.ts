import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styles: [".margin-left {margin-left:250px;}", 
            ".current-user-span {display:block; padding:0px}" ,
            ".current-user-link {margin-left:5px; text-align: center;}"
          ]
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private auth: AuthService, private router:Router)  {}

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
