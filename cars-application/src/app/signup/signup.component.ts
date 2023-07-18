import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private log: LoginService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.log.loggedInStatus) {
      Swal.fire({
        icon: 'info',
        title: 'Already Logged In',
        text: 'Please logout before signing up.',
        timer: 3000,
        showConfirmButton: false,
      });
      this.router.navigateByUrl('/dashbord');
    }
  }

  signUp() {
    if (this.form.valid) {
      const user = {
        email: this.form.value.email,
        username: this.form.value.username,
        password: this.form.value.password,
        address: this.form.value.address,
        user_role: 'user',
        products: [],
      };

      this.http
        .post('http://localhost:9501/userProduct/addUser', user)
        .subscribe((response) => {
          console.log(response);
        });

      console.log(this.form.value);
      this.router.navigateByUrl('/login');

      Swal.fire({
        icon: 'success',
        title: 'Form submitted successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fix the errors in the form.',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  // signUp() {
  //   const user = {
  //     email: this.form.value.email,
  //     username: this.form.value.username,
  //     password: this.form.value.password,
  //     address: this.form.value.address,
  //     user_role: 'user',
  //     products: [],
  //   };

  //   this.http
  //     .post('http://localhost:9501/userProduct/addUser', user)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.router.navigateByUrl('/login');
  //     this.snackBar.open('Form submitted successfully!', '', {
  //       duration: 3000,
  //     });
  //   } else {
  //     this.snackBar.open('Please fix the errors in the form.', '', {
  //       duration: 3000,
  //     });
  //   }
  // }
}
