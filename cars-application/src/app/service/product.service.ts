/* This is a TypeScript class that provides methods for interacting with a product API, including
getting, saving, deleting, and updating products, with authorization headers included. */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
   }

   getProducts(token:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
   return this.http.get('http://localhost:9501/product/get');

   }

   saveProducts(token:any,data:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
   return this.http.post('http://localhost:9501/product/save', data);

   }

   deleteProduct(token:any,productid:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
   return this.http.delete(`http://localhost:9501/product/delete-product/${productid}`);
   }
  //  http://localhost:8081/product/update
   updateproduct(product:any){
    return this.http.post('http://localhost:9501/product/update',product);

   }

  }
