import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDtoUserData } from '../dto-user-data';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    constructor(private http:HttpClient) { }
    
    getUser(username:string, password:string) : Observable<IDtoUserData>
    {
        var uri = `${environment.apiurl}/UserData/${username}/${password}`;
        return this.http.get<IDtoUserData>(uri).pipe(tap(data=>console.log(JSON.stringify(data))));
    }
  }