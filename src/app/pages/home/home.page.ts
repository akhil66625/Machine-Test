import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private api:ApiService,
    private geoLocation: Geolocation,
    private router:Router
  ) { }

  ngOnInit() {
    if(!this.api.isLoggedIn()){
      this.router.navigateByUrl("login");
    } else {
      this.saveLocation();
    }
  }

saveLocation(){

  this.geoLocation.getCurrentPosition().then((resp) => {
    console.log("getting",resp);
    
    this.api.saveLocation(resp.coords.latitude,resp.coords.longitude).subscribe(data=>{
      console.log("saved Location",data);
      
    })
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
}
logout(){
  this.api.logout();
  this.router.navigateByUrl("login");
}
}
