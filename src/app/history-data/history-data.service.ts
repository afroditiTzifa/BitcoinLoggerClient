import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDtoData } from '../common/dto-data.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryDataService  {

  constructor(private http : HttpClient) { }


  getHistoryData(userid : number): Observable<IDtoData[]>{
    var uri =`${environment.apiurl}/HistoryData/${userid}`;
    console.log(uri);
    return this.http.get<IDtoData[]>(uri).pipe(
      tap(data => console.log(`getHistoryData: ${JSON.stringify(data)}`))
    );
    
  }


}
