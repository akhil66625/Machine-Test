import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {


  email;
  password;
  constructor(
    private api:ApiService,
    private router:Router
  ) { }


  ngOnInit() {
    if(this.api.isLoggedIn()){
      this.router.navigateByUrl("home");
    }
  }

  login()
 {
   console.log("email",this.email,"password",this.password);
   
   this.api.login(this.email,this.password)
   .subscribe((user:any)=> {
     console.log("login is success......>>", user);
     if(user.deviceId) {
    this.api.setLoginTrue(user);
     this.router.navigateByUrl("home");
     }else{
       alert(user);
     }
     
   });
 }
}
