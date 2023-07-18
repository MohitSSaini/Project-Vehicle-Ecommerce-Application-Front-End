import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { product } from '../model/product';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  email = localStorage.getItem('email');

  constructor(private http: HttpClient, private log: LoginService,private router:Router )  { }

  /* `cars: product[] = [];` is declaring an empty array of type `product` and assigning it to the
  `cars` variable. */
  cars: product[] = [];
  data: any; // data is variable  it can hold any type of value

  len:number=this.cars.length;

  ngOnInit(): void {
    this.http.get(`http://localhost:9501/userProduct/user/${localStorage.getItem('email')}`)
      .subscribe(response => {
        console.log(response);
        this.data = response;
        this.cars = this.data.products;
      });
  }

  deleteitem(id: any) {
    const idToRemove = id;

    const index = this.cars.findIndex((obj) => obj.productname == idToRemove);

    if (index > -1) {
      this.cars.splice(index, 1);
    }
    console.log(this.cars)

    if (this.log.loggedInStatus) {
      var user = {
        email: this.email,
        products: this.cars
      };
      Swal.fire({
        icon: 'success',
        title: 'Deleted from Cart!',
        text: '',
        timer: 3000,
        showConfirmButton: false
      });
      this.http.post('http://localhost:9501/userProduct/update', user)
        .subscribe(response => {
        });
    }

  }
  senddata(){
    this.router.navigateByUrl("/reciept");
  }


  logout(){
    localStorage.setItem("jwtToken","")
    this.router.navigateByUrl("login")
    this.log.isloggedout();
    Swal.fire({
      icon: 'success',
      title: 'Logout successful!',
      text: '',
      timer: 3000,
      showConfirmButton: false
    });

  }

}

