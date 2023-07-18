import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { product } from '../model/product';
import { LoginService } from '../service/login.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /* These are class properties in the `DashboardComponent` class. */
  public AllProducts: any;
  formBuilder: any;

  email = localStorage.getItem('email');
  products: any = [];
  cartItems: product[] = [];
  data: any;
  logindetail = this.login.loggedInStatus;

  constructor(
    private http: HttpClient,
    private prod: ProductService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get(
        `http://localhost:9501/userProduct/user/${localStorage.getItem(
          'email'
        )}`
      )
      .subscribe((response) => {
        console.log(response);
        this.data = response;
        this.cartItems = this.data.products;
      });

    this.prod
      .getProducts(localStorage.getItem('jwtToken'))
      .subscribe((response) => {
        console.log(response);
        this.AllProducts = response;
      });
  }
  public form!: FormGroup;

  addToCart(product: any) {
    if (!this.cartItems) {
      this.cartItems = [];
    }

    if (
      this.cartItems.findIndex(
        (item) => item.productid === product.productid ) === -1) {
      this.cartItems.push(product);
      console.log(this.cartItems);
      if (this.login.loggedInStatus) {
        var user = {
          email: this.email,
          products: this.cartItems,
        };

        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: '',
          timer: 3000,
          showConfirmButton: false,
        });

        this.http
          .post('http://localhost:9501/userProduct/update', user)
          .subscribe((response) => {
            // console.log(response);
          });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Please Login',
          text: 'Please login to add items to your cart.',
          timer: 3000,
          showConfirmButton: false,
        });
        this.router.navigateByUrl('/login');
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }

  logout() {
    this.login.isloggedout();
    localStorage.setItem('email', '');
    Swal.fire({
      icon: 'success',
      title: 'Logged out',
      text: 'You have been successfully logged out.',
      showConfirmButton: false,
      timer: 3000,
    }).then(() => {
      location.reload();
    });
  }
}

// addToCart(product: any) {
//   // console.log(product);
//   if (!this.cartItems) {
//     this.cartItems = []; // initialize the array if it's null
//   }
//   this.cartItems.push(product); // add the item to the array

//   console.log(this.cartItems);

//   if (this.login.loggedin) {
//     // this.products.push(product);
//     var user = {
//       email: this.email,
//       products: this.cartItems
//     };
//     // console.log(this.products);
//     // console.log(localStorage.getItem('email'))
//     alert("added to cart");
//     this.http.post('http://localhost:9501/userProduct/update', user)
//       .subscribe(response => {
//         // console.log(response);
//       });

//   }
//   else {
//     alert("please login to add")
//     this.router.navigateByUrl("/login");
//   }
// }

// logout() {
//   this.login.isloggedout;
//   location.reload();
//   localStorage.setItem('email', '');
//   alert('logged out');
// }
