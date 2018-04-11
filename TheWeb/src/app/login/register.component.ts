import { Component, OnInit, Input } from '@angular/core';
import {
    FormGroup, FormsModule, FormBuilder, FormControl, Validator,
    ValidatorFn, AbstractControl, FormArray, Validators
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { MiscellaneousService } from '../services/miscellaneous.service';

@Component({
    selector: 'register-popup',
    templateUrl: 'app/login/register.component.html',
    styleUrls: ['app/login/login.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    statusMessage: string;

    register() {
        const email = this.registerForm.get('email').value;
        const password = this.registerForm.get('password').value;
        const password_confirmation = this.registerForm.get('password_confirmation').value;
        this._authService.register(email, password, password_confirmation)
            .subscribe(
                (data: any) => {
                    if (data === 200) {
                        this.statusMessage = "Successfully registerd! You will be automatically logged in shortly.";
                        setTimeout(() => {
                            this._miscServ.changeLoginPopupStatus();
                        }, 2000);
                        
                    }
                    else {
                        this.statusMessage = "Something went wrong. Try agin after sometime";
                    }
                },
                (error: any) => {
                    console.log("Error happened. " + error);
                    this.statusMessage = "Something went wrong. Try agin after sometime";
                }
            );
        //console.log('u-' + email + '/n' + 'pass-' + password);
        //$('#loginModal').modal('hide');
    }
    ngOnInit(): void {
        this.registerForm = this._fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            password_confirmation: ['', [Validators.required]]
        })
    }
    constructor(private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _miscServ: MiscellaneousService) { }
}