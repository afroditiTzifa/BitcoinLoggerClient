import { Injectable } from '@angular/core';
import { IDtoUserData } from '../dto-user-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  register(userData:IDtoUserData ) {
    var uri =`${environment.apiurl}/UserData`;
    console.log(uri);
    console.log(JSON.stringify(userData));
    return this.http.post(uri, userData);

  }
}
