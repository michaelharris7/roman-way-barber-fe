import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user'
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User;
  submitted: boolean;
  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(value: any) {
    this.submitted = true;
    if (!this.registerForm.valid) { return; }

    this.authService.logIn(value.email, value.password).subscribe(
      this.authService.redirectAfterLogin.bind(this.authService),
      this.afterFailedRegister.bind(this)
    );
  }

//   this._tokenService.registerAccount({
//     email:                'example@example.org',
//     password:             'secretPassword',
//     passwordConfirmation: 'secretPassword'
// }).subscribe(
//     res =>      console.log(res),
//     error =>    console.log(error)
// );

  afterFailedRegister(errors: any) {
    let parsed_errors = JSON.parse(errors._body).errors;
    for(let attribute in this.registerForm.controls) {
      if (parsed_errors[attribute]) {
        this.registerForm.controls[attribute]
            .setErrors(parsed_errors[attribute]);
      }
    }
    this.registerForm.setErrors(parsed_errors);
  }
}