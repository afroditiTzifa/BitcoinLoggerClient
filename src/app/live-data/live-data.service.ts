import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { IDtoData } from '../common/dto-data.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LiveDataService {

  constructor(private http:HttpClient) { }

  
  getLiveData(): Observable<IDtoData[]>{
    var uri =`${environment.apiurl}/LiveData`;
    return this.http.get<IDtoData[]>(uri).pipe(
      tap(data=>console.log(`getLiveData: ${JSON.stringify(data)}`))
    );
  }

  
  saveHistoryData(row: IDtoData, userid:number){
    var uri =`${environment.apiurl}/HistoryData/${userid}`;
    return this.http.post(uri, row).pipe(
      tap(data=>console.log(`saveHistoryData: ${JSON.stringify(row)}`))
    );
  }


}
