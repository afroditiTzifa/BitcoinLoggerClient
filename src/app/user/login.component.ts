import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.auth.loginUser(this.f.username.value, this.f.password.value).subscribe(
        {
          next: response => 
          {  
            if (this.auth.isAuthenticated())
              this.router.navigateByUrl(this.returnUrl); 
            else 
              this.toastr.error("Wrong username or password. Please try again.")        
          }, 
          error: err =>
          {
            console.log(`Error loginUser: ${JSON.stringify(err)}`); 
            this.toastr.error('An error occurred. Please try again later')
          },
         }
        );    

    }

    
}
