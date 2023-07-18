import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  responsedata: any;
  logindetails = this.log.loggedInStatus;

  public token: string = '';
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private log: LoginService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.log.loggedInStatus && localStorage.getItem('user') == 'admin') {
      this.router.navigateByUrl('/admin');
    } else if (this.log.loggedInStatus) {
      Swal.fire({
        icon: 'info',
        title: 'Already Logged In',
        text: 'You are already logged in.',
        timer: 3000,
        showConfirmButton: false
      });
      this.router.navigateByUrl('/dashbord');
    }
  }

  login() {
    this.log.login(this.form.value).subscribe(
      (response) => {
        this.responsedata = response;
        localStorage.setItem('jwtToken', this.responsedata.token);
        // alert(this.responsedata.message);
        console.log(this.responsedata.role);

        this.token = this.responsedata.token;

        if (this.responsedata.role === 'admin') {
          this.router.navigateByUrl('/admin');
          localStorage.setItem('user', 'admin');
          this.log.isloggedin();
          Swal.fire({
            icon: 'success',
            title: 'Admin Login successful!',
            text: '',
            timer: 3000,
            showConfirmButton: false
          });
        } else if (this.responsedata.message === 'Logged in Successfully!') {
          localStorage.setItem('email', this.responsedata.email);
          this.log.isloggedin();
          localStorage.setItem('user', 'user');
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: '',
            timer: 3000,
            showConfirmButton: false
          });
        }
      },

      (error) => {
        // alert('Invalid username or password');
        Swal.fire({
          icon: 'error',
          title: 'Invalid username or password',
          text: '',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
    if (this.form.valid) {
      // console.log(this.form.value);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please fix the errors in the form.',
        text: '',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }












  // login() {
  //   this.log.login(this.form.value).subscribe(
  //     (response) => {
  //       this.responsedata = response;
  //       localStorage.setItem('jwtToken', this.responsedata.token);
  //       alert(this.responsedata.message);
  //       console.log(this.responsedata.role);

  //       this.token = this.responsedata.token;

  //       if (this.responsedata.role === 'admin') {
  //         this.router.navigateByUrl('/admin');
  //         localStorage.setItem('user', 'admin');
  //         this.log.isloggedin();
  //       } else if (this.responsedata.message === 'Logged in Successfully!') {
  //         localStorage.setItem('email', this.responsedata.email);
  //         this.log.isloggedin();
  //         localStorage.setItem('user', 'user');
  //         this.router.navigateByUrl('/dashboard');
  //         this.snackBar.open('Login successfully!', '', { duration: 3000,panelClass:'success-notification' });
  //       }
  //     },
  //     (error) => {
  //       alert('Invalid username or password');
  //     }
  //   );
  //   if (this.form.valid) {
  //     // console.log(this.form.value);
  //   } else {
  //     this.snackBar.open('Please fix the errors in the form.', '', {
  //       duration: 3000,
  //     });
  //   }
  // }
}

//   if (this.responsedata.role == "admin") {
//     //console.log(this.responsedata.token);
//     this.router.navigateByUrl("/admin");
//     localStorage.setItem("user", "admin");
//     this.log.isloggedin();

//   } else if (this.responsedata.message == "Logged in Successfully!") {

//     localStorage.setItem("email", this.responsedata.email);
//     // console.log(localStorage.getItem('email'))
//     this.log.isloggedin();
//     localStorage.setItem("user", "user")
//     this.router.navigateByUrl("/dashboard");
//     this.snackBar.open('Login successfully!', '', { duration: 3000 });
//   }
//    else if (!this.responsedata.message)
//   { alert("please input valid username and password"); }
// });
