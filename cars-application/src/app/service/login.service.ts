import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

loggedInStatus: boolean = false;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post('http://localhost:9501/userAuth/login', data);
  }

  isloggedin() {
    this.loggedInStatus = true;
  }

  isloggedout() {
    this.loggedInStatus = false;
  }
}
