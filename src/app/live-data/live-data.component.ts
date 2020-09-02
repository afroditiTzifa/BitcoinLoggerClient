import { Component, OnInit } from '@angular/core';
import { IDtoData} from '../dto-data';
import { LiveDataService } from './live-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';
import { IDtoUserData } from '../dto-user-data';

@Component({
  templateUrl: './live-data.component.html',
})

export class LiveDataComponent implements OnInit {
   
  liveData: IDtoData[];
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.liveData);
  userid : number;
  username :string;

  constructor(private srv: LiveDataService, private router: Router) 
  { 
    var currentUser : IDtoUserData;
    currentUser = JSON.parse (localStorage.getItem('currentUser'));
    if (currentUser != null){
      this.userid= currentUser.id;
      this.username = currentUser.username;  
    }  
  } 
  

  ngOnInit()
  {  
    
    this.srv.getLiveData().subscribe(
      {
        next:response => this.liveData = response, 
        error: err => console.log(err)
       }
      ); 
  }


  onClick(row: IDtoData){
    this.srv.saveHistoryData(row, this.userid).subscribe(
      {
        next: response=> this.router.navigateByUrl('/history') , 
        error: err=>console.log(err)
      }
      );
        
   

  }  


}



