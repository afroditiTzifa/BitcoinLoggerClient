import { Component, OnInit, ViewChild } from '@angular/core';
import { IDtoData} from '../dto-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { HistoryDataService } from './history-data.service';

@Component({
  templateUrl: './history-data.component.html'
})
export class HistoryDataComponent  implements OnInit{
  historyData: IDtoData[];
  errorMessage: string;
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.historyData);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private srv: HistoryDataService)  { }


  ngOnInit()
  {

    this.srv.getHistoryData().subscribe(
      {
       next:response=> 
          { this.historyData=response;
            this.dataSource=new MatTableDataSource(this.historyData);
            this.dataSource.paginator =this.paginator;
            this.dataSource.sort = this.sort;
          }, 
          error: err=>this.errorMessage=err
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


