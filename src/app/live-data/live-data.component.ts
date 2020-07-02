import { Component, OnInit } from '@angular/core';
import { IDtoData} from '../dto-data';
import { LiveDataService } from './live-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../globals';

@Component({
  templateUrl: './live-data.component.html',
})

export class LiveDataComponent implements OnInit {
   
  liveData: IDtoData[];
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.liveData);

  constructor(private srv: LiveDataService, private glb:Globals) { } 


  ngOnInit()
  {  
    
    this.srv.getLiveData().subscribe(
      {
        next:response=> this.liveData=response, 
        error: err=>console.log(err)
       }
      ); 
  }


  onClick(row: IDtoData){
    this.srv.saveHistoryData(row, this.glb.userid).subscribe(
        {
          error: err=>console.log(err)
        }
        );
        

    

  }  


}



