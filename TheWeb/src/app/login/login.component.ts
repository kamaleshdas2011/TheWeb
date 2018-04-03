import { Component, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import {
    FormGroup, FormsModule, FormBuilder, FormControl, Validator,
    ValidatorFn, AbstractControl, FormArray, Validators
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'login-popup',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
})
export class LoginComponent implements OnInit {
    //@Input() heading: string;

    loginForm: FormGroup;
    statusMessage: string;

    private store(body: any): void {
        localStorage.setItem('access_token', JSON.stringify(body));
    }
    login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        this._authService.authenticate(email, password)
            .subscribe(
                (data: any) => {
                    this.statusMessage = "Login successful.";
                    this.store(data);
                    location.reload();

                },
                (error: any) => {
                    console.log("Error happened. " + error);
                    this.statusMessage = "Something went wrong. Try agin after sometime";
                }
            );
    }
    googlesign() {
        window.location.href = 'http://localhost:49959/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=qZyaWwj_FWNiM0GtwFno9Z40kOY1lwVjDJAFvVy5o3I1';
    }

    ngOnInit(): void {
        this.loginForm = this._fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        if (location.hash) {
            if (location.hash.split('access_token=')) {
                var accessToken = location.hash.split('access_token=')[1].split('&')[0];
                if (accessToken) {
                    this._authService.isUserRegistered(accessToken);
                }
            }
        }
    }
    constructor(private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _elm: ElementRef,
        private _rend: Renderer2) { }
}