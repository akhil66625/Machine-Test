import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
user;
  constructor(
    private http:HttpClient
  ) { }

  login(_email,_password)
  {
    var formData: any = new FormData();
    formData. append("email", _email);
    formData.append("password",_password);
    return this.http.post('https://app.sascolive.com/APIScripts/API/login',formData)
  }
  setLoginTrue(user) {
    localStorage.setItem('login',"true");
    localStorage.setItem('user',JSON.stringify(user));
    this.user = user;
  }
  isLoggedIn(){
    return localStorage.getItem('login')?true:false;
  }
  saveLocation(lat,lang){
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('https://app.sascolive.com/APIScripts/API/saveLocationCordinates',{
      longitude          : lang,

      latitude           : lat,

      deviceId           : this.user.diviceId,

      employeeId      : this.user.empolyeeUniqwId
    });
  }

  logout(){
    localStorage.clear();
  }
}
