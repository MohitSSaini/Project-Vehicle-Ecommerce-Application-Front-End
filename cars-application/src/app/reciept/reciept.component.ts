import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { product } from '../model/product';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent {
  email = localStorage.getItem('email');

  cars: product[] = [];
  data: any;

  len:number=this.cars.length;

constructor(private http:HttpClient,private log:LoginService,private router:Router ){}

  ngOnInit(): void {
    this.http.get(`http://localhost:9501/userProduct/user/${localStorage.getItem('email')}`)
      .subscribe(response => {
        console.log(response);
        this.data = response;
        this.cars = this.data.products;
      });
  }
  view() {
    this.router.navigateByUrl("/cart");
}

submit(){
  Swal.fire({
    icon: 'info',
    title: 'COD Order Submitter.',
    text: 'We will give you a call back.',
    timer: 3000,
    showConfirmButton: false
  });
// this.cars=[];
if (this.log.loggedInStatus) {
  var user = {
    email: this.email,
    products: this.cars
  };
  this.http.post('http://localhost:9501/userProduct/update',user)
    .subscribe(response => {
    });

 this.router.navigateByUrl("user-dasborad");
}
}
}
