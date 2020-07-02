import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../globals';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, private glb : Globals) { }

  ngOnInit() {
  }


}
