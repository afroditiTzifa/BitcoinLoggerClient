import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDtoUserData } from './dto-user-data.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthService{

    currentUser: IDtoUserData;

    constructor(private http:HttpClient) { }

    isAuthenticated() : boolean{
        if (this.currentUser == null)
            this.currentUser = JSON.parse (localStorage.getItem('currentUser'));
        return this.currentUser?.id > 0;
    }
    
    loginUser(username:string, password:string) : Observable<IDtoUserData>{
        var uri = `${environment.apiurl}/UserData/${username}/${password}`;
        return this.http.get<IDtoUserData>(uri).pipe(
            tap(data => {
                this.currentUser = data; 
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                console.log(`loginUser: ${JSON.stringify(data)}`);
            })
        );
    }
    

    addUser(userData:IDtoUserData ) {
        var uri =`${environment.apiurl}/UserData`;          
        return this.http.post(uri, userData).pipe(
            tap(data => {
                userData.id= +data;
                this.currentUser = userData;
                console.log(`addUser: ${JSON.stringify(userData)}`);
            })
        );
      }

    updateUser(userData:IDtoUserData ) {
        var uri =`${environment.apiurl}/UserData`;    
        userData.id = this.currentUser.id;    
        return this.http.put(uri, userData).pipe(
            tap(data => {
                this.currentUser = userData; 
                console.log(`updateUser: ${JSON.stringify(userData)}`);
            })
        );
    }

    async validUsename(username:string): Promise<boolean>
    {
        var uri = `${environment.apiurl}/UserData/${username}`;
        const valid = await this.http.get<boolean>(uri).toPromise();
        console.log(`validUsename: ${JSON.stringify(valid)}`);
        return valid;
    }

      
}
