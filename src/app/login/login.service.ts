import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    constructor(private http:HttpClient) { }
    
    getUserId(username:string, password:string) : Observable<number>
    {
        var uri = `${environment.apiurl}/UserData/${username}/${password}`;
        return this.http.get<number>(uri).pipe(tap(data=>console.log(data)));
    }
  }