import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private srv: LoginService,
        private glb: Globals,
        private dialog: MatDialog
    ) {
        
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) { return; }

        console.log(`${this.f.username} ${this.f.password}`);
        this.loading = true;
        this.srv.getUserId(this.f.username.value, this.f.password.value).subscribe(
        {
          next: response=> 
          {
            this.glb.userid = response; 
            console.log(this.glb.userid);   
            if (this.glb.userid >0)
            {
              this.glb.username= this.f.username.value;
              this.router.navigateByUrl('/live');
            }  
            //else this.openModal();                    
          }, 
          error: err=>{
            console.log(err);
            this.loading = false;
          }
         }
        );
        

    }

    openModal() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      dialogConfig.data = {errorMessage : 'Invalid username or password'};
      this.dialog.open(ModalComponent, dialogConfig);
    }
}
