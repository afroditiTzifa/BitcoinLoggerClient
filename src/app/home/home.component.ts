import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { IDtoUserData } from '../dto-user-data';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userid : number;
  username :string

  constructor(private router : Router) 
  { 
    var currentUser : IDtoUserData;
    currentUser = JSON.parse (localStorage.getItem('currentUser'));
    if (currentUser != null){
      this.userid= currentUser.id;
      this.username = currentUser.username;  
    } 
  }

  ngOnInit() {
  }


}
