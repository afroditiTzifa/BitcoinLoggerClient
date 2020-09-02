import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDtoData } from '../dto-data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HistoryDataService  {

  constructor(private http : HttpClient) { }

  

  getHistoryData(userid : number): Observable<IDtoData[]>{
    var uri =`${environment.apiurl}/HistoryData/${userid}`;
    console.log(uri);
    return this.http.get<IDtoData[]>(uri);
  }


}
