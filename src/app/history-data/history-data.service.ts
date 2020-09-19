import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBitcoinPriceDto } from '../common/bitcoin-price-dto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryDataService  {

  constructor(private http : HttpClient) { }


  getHistoryData(userid : number): Observable<IBitcoinPriceDto[]>{
    var uri =`${environment.apiurl}/HistoryData/${userid}`;
    return this.http.get<IBitcoinPriceDto[]>(uri).pipe(
      tap(data => console.log(`getHistoryData: ${JSON.stringify(data)}`))
    );
    
  }


}
