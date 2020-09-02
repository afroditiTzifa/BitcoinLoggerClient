import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ModalService } from '../modal/modal.service';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private srv: LoginService,
        private modalService: ModalService
    ) {}

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

        this.srv.getUser(this.f.username.value, this.f.password.value).subscribe(
        {
          next: response=> 
          {  
            if (response.id > 0)
            {
              localStorage.setItem('currentUser', JSON.stringify(response));
              this.router.navigateByUrl(this.returnUrl);
            }  
            else this.openModal("custom-modal-1");         
          }, 
          error: err=>console.log(err)
         }
        );    

    }

    
  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
