import { Component, OnInit, ViewChild } from '@angular/core';
import { IDtoData} from '../dto-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { HistoryDataService } from './history-data.service';
import { IDtoUserData } from '../dto-user-data';
import { Router } from '@angular/router';


@Component({
  templateUrl: './history-data.component.html'
})
export class HistoryDataComponent  implements  OnInit {
  historyData: IDtoData[];
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.historyData);
  userid : number;
  username :string;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private srv: HistoryDataService, private router: Router)  {
    var currentUser : IDtoUserData;
    currentUser = JSON.parse (localStorage.getItem('currentUser'));
    if (currentUser != null){
      this.userid= currentUser.id;
      this.username = currentUser.username;  
    }   
  }


  ngOnInit()
  {
    this.srv.getHistoryData(this.userid).subscribe(
      {
       next:response=> 
          { 
            this.historyData=response;
            this.dataSource=new MatTableDataSource(this.historyData);
            this.dataSource.paginator =this.paginator;
            this.dataSource.sort = this.sort;
          }, 
          error: err=>console.log(err),
       }
      );

  }
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }







}


