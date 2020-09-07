import { Component, OnInit } from '@angular/core';
import { IDtoData} from '../common/dto-data.model';
import { LiveDataService } from './live-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';
import { AuthService } from '../user/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './live-data.component.html',
})

export class LiveDataComponent implements OnInit {
   
  liveData: IDtoData[];

  constructor(
    private srv: LiveDataService, 
    private router: Router, 
    private auth: AuthService, 
    private toastr:ToastrService) { } 
  

  ngOnInit(){      
    this.srv.getLiveData().subscribe(
      {
        next:response => this.liveData = response, 
        error: err => 
        {
          console.log(`Error getLiveData: ${JSON.stringify(err)}`); 
          this.toastr.error('An error occurred. Please try again later')
        },
       }
      ); 
  }


  onClick(row: IDtoData){
    this.srv.saveHistoryData(row, this.auth.currentUser.id).subscribe(
      {
        next: response=> this.router.navigateByUrl('/history') , 
        error: err=>
        {
          console.log(`Error saveHistoryData: ${JSON.stringify(err)}`); 
          this.toastr.error('An error occurred. Please try again later')
        },
      });
        
  }  


}



