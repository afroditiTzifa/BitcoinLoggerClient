import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { IBitcoinPriceDto } from '../common/bitcoin-price-dto.model';
import { ICurrencyPairDto } from '../common/currency-pair-dto.model';
import { environment } from 'src/environments/environment';
import { DateAdapter } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class LiveDataService {

  constructor(private http:HttpClient) { }

  
  getLiveData(currencyPair: number): Observable<IBitcoinPriceDto[]>{
    var uri =`${environment.apiurl}/LiveData/${currencyPair}`;
    return this.http.get<IBitcoinPriceDto[]>(uri).pipe(
      tap(data=>console.log(`getLiveData: ${JSON.stringify(data)}`))
    );
  }

  
  saveHistoryData(row: IBitcoinPriceDto, userid:number){
    var uri =`${environment.apiurl}/HistoryData/${userid}`;
    return this.http.post(uri, row).pipe(
      tap(data => console.log(`saveHistoryData: ${JSON.stringify(row)}`))
    );
  }

  async getCurrencyPairs(): Promise<ICurrencyPairDto[]>
  {
    var uri =`${environment.apiurl}/CurrencyPairData`;
    const data = this.http.get<ICurrencyPairDto[]>(uri).toPromise();
    console.log(`getCurrencyPairs: ${JSON.stringify(data)}`);
    return data;
  }


}
