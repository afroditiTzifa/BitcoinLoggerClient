import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDtoData } from '../dto-data';

@Injectable({
  providedIn: 'root'
})
export class HistoryDataService {

  constructor(private http : HttpClient) { }

  getHistoryData(){
   return this.http.get<IDtoData[]>("https://bitcoinloggerapi.azurewebsites.net/HistoryData");
  }


}
