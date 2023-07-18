import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, assertPlatform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import { ProductService } from '../service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public form!: FormGroup;
  public AllProducts: any;

  pro: any;
  name = '';
  image = '';
  di = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private prod: ProductService,
    private router: Router,
    private login: LoginService
  ) {
    this.form = this.formBuilder.group({
      productid: ['', [Validators.required]],
      productname: ['', [Validators.required]],
      img: ['', [Validators.required]],
      des: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.prod
      .getProducts(localStorage.getItem('jwtToken'))
      .subscribe((response) => {
        console.log(response);
        this.AllProducts = response;
      });
  }

  logout() {
    localStorage.setItem('jwtToken', '');
    this.router.navigateByUrl('/');
    this.login.isloggedout();
    Swal.fire({
      icon: 'success',
      title: 'Admin Logout successful!',
      text: '',
      timer: 3000,
      showConfirmButton: false
    });
  }

  edit() {
    const mytoken = localStorage.getItem('jwtToken');

    this.prod.updateproduct(this.form.value).subscribe((response) => {
      console.log(response);
    });

    if (this.form.valid) {
      this.snackBar.open('Form submitted successfully!', '', {
        duration: 3000,
      });
      this.router.navigateByUrl('/login');
    }
  }

  deleteProduct(productid: any) {
    const mytoken = localStorage.getItem('jwtToken');
    Swal.fire({
      icon: 'success',
      title: 'Deleted from AdminCart!',
      text: '',
      timer: 3000,
      showConfirmButton: false
    });

    this.prod.deleteProduct(mytoken, productid).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/login');
    });
  }
  editProduct(product: any) {
    this.pro = product.productid;
    this.name = product.productname;
    this.image = product.img;
    this.di = product.des;
  }
}
