import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { IDtoData } from '../dto-data';


@Injectable({
  providedIn: 'root'
})
export class LiveDataService {

  constructor(private http:HttpClient) { }


  
  getLiveData(): Observable<IDtoData[]>{
    return this.http.get<IDtoData[]>("https://bitcoinloggerapi.azurewebsites.net/LiveData/").pipe(
      tap(data=>console.log('All: '+JSON.stringify(data))),
      catchError(this.handleError)
    );
  }



  private handleError(err : HttpErrorResponse){
    let errorMessage='';
    if (err.error instanceof ErrorEvent)  {
      errorMessage= `An error occured: ${err.error.message}`;
    }
    else{
      errorMessage=`Server returned code: ${err.status}, error message is: ${err.error.message}`
    }
    console.error(errorMessage)
    return throwError(errorMessage);
  }
}
