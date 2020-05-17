import { Component, OnInit } from '@angular/core';
import { IDtoData} from '../dto-data';
import { LiveDataService } from './live-data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './live-data.component.html',
})

export class LiveDataComponent implements OnInit {
   
  errorMessage: string;
  liveData: IDtoData[];
  displayedColumns: string[] = ['source', 'price', 'timestamp'];
  dataSource  = new MatTableDataSource(this.liveData);

  constructor(private srv: LiveDataService) { } 


  ngOnInit()
  {  
    
    this.srv.getLiveData().subscribe(
      {
        next:response=> this.liveData=response, 
        error: err=>this.errorMessage=err
       }
      ); 
  }


  onClick(sourceId: number){
    /*
    this.srv.SaveHistoryData(sourceId).subscribe(
        {
          next:response=> {this.bitcoinPrice=response;  
                           let fetchedData ="price: ".concat(this.bitcoinPrice.price.toFixed(2).toString()).concat(" ,timestamp: ").concat(this.bitcoinPrice.timestamp.toString());
                           this.bitcoinSources.find(x => x.id === sourceId).fetchedData = fetchedData;}, 
          error: err=>this.errorMessage=err
        }
        );
        */

    

  }  


}



