import { Component, OnInit, ViewChild } from '@angular/core';
import { IDtoData} from '../common/dto-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { HistoryDataService } from './history-data.service';
import { AuthService } from '../user/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './history-data.component.html'
})
export class HistoryDataComponent  implements  OnInit {
  historyData: IDtoData[];
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.historyData);


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private srv: HistoryDataService, 
    private auth: AuthService, 
    private toastr: ToastrService)  {  }


  ngOnInit()
  {
    this.srv.getHistoryData(this.auth.currentUser.id).subscribe(
      {
       next:response=> 
          { 
            this.historyData=response;
            this.dataSource=new MatTableDataSource(this.historyData);
            this.dataSource.paginator =this.paginator;
            this.dataSource.sort = this.sort;
          }, 
          error: err=>
          {
            console.log(`Error getHistoryData: ${JSON.stringify(err)}`); 
            this.toastr.error('An error occurred. Please try again later');
          },
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


