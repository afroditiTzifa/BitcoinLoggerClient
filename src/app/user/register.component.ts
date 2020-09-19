import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './register.component.html',
  styles:[".float-right {float:right} "]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
      private auth: AuthService, 
      private router: Router, 
      private toastr: ToastrService) {  }

    ngOnInit() {
        this.registerForm = new FormGroup({
            firstname: new FormControl(this.auth.currentUser?.firstname, Validators.required),
            lastname: new FormControl(this.auth.currentUser?.lastname, Validators.required),
            username: new FormControl(this.auth.currentUser?.username, Validators.required),
            password: new FormControl(this.auth.currentUser?.password, [Validators.required, Validators.minLength(4)])
        });
        
    }

    get f() { return this.registerForm.controls; }


    onSubmit() {
      
      if (this.auth.isAuthenticated())
        this.auth.updateUser(this.registerForm.value).subscribe(
        { 
          next: response => this.router.navigateByUrl('/home'),
          error: err=> 
          {
            console.log(`Error updateUser: ${JSON.stringify(err)}`); 
            this.toastr.error('An error occurred. Please try again later')
          },
        });
      else{
        const promise = this.auth.validUsename(this.f.username.value);
        promise.then((valid)=>{ 
        if (!valid){
          this.toastr.error('The username already exists. Please use a different username');
          return false;
        }
        this.addUser();
        }).catch((err)=>{
          console.log(`Error validUsername: ${JSON.stringify(err)}`);
        });   
      }
       
    }


    cancel(){
      if (this.auth.isAuthenticated())
        this.router.navigateByUrl('/home');
      else
        this.router.navigateByUrl('/login');
    }

    addUser(){ 
      this.auth.addUser(this.registerForm.value).subscribe(
       {
          next: response => this.router.navigateByUrl('/home'),
          error: err=> 
          {
            console.log(`Error addUser: ${JSON.stringify(err)}`); 
            this.toastr.error('An error occurred. Please try again later')
          },
       });
    }



   

}
