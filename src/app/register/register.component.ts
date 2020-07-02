import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { IDtoUserData} from '../dto-user-data';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private srv: RegisterService
    ) { 
        
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) { return; }

        this.loading = true;
        this.srv.register(this.registerForm.value).subscribe(
          {
            error: err=> 
            {
              this.loading = false;
              console.log(err);
            }
          });
    }

}
