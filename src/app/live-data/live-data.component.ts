import { Component, OnInit } from '@angular/core';
import { IBitcoinPriceDto} from '../common/bitcoin-price-dto.model';
import { LiveDataService } from './live-data.service';
import { Router} from '@angular/router';
import { AuthService } from '../user/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ICurrencyPairDto } from '../common/currency-pair-dto.model';

@Component({
  template: ` 
                <div class="dropdown">
                  Currency Pair
                  <select class="dropdown-content"  [(ngModel)]="selectedLevel" (change)="selected()"> 
                    <option *ngFor="let item of currencyPairs" [ngValue]="item.id">{{item.description}}</option>
                      </select>
                </div>
                <div *ngFor="let row of liveData">
                    <crypto-exchange [row]=row (clickEvent)="handleClickEvent($event)"></crypto-exchange>
                </div>
              `,
 styles: [".dropdown {margin-bottom:40px;}",
          ".dropdown-content {background-color:lightgray; color:black; min-width:160px}"
         ]

})

export class LiveDataComponent implements OnInit {
   
  liveData: IBitcoinPriceDto[];
  currencyPairs: ICurrencyPairDto[];
  selectedLevel = 1;
 


  constructor(
    private srv: LiveDataService, 
    private router: Router, 
    private auth: AuthService, 
    private toastr:ToastrService) { } 
  
  getLiveData(){
    this.srv.getLiveData(this.selectedLevel).subscribe(
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

  ngOnInit(){    
    const promise = this.srv.getCurrencyPairs();
    promise.then((response)=>{
       this.currencyPairs = response;
       this.getLiveData();
    }).catch((err)=>{
      console.log(`Error getCurrencyPairs: ${JSON.stringify(err)}`);
    }); 
    this.getLiveData();
  }


  handleClickEvent(row: IBitcoinPriceDto){
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
  
  selected(){
    this.getLiveData();
  }


}



