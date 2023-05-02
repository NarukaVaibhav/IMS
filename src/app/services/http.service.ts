import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';
import {Router} from "@angular/router";
import {ConfirmDialogModel, DialogSHOWComponent } from '../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type':  'application/json; charset=utf-8',
      'x-app-version': '12',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(public dialog: MatDialog, private router: Router,public httpServe: HttpClient, public urlimport:UrlService) {}
  
  url = this.urlimport.location_url; 

  Loginpost(userInfo){
    console.log(this.url);
    return this.httpServe.post<any>(`${this.url}/userlogin`, userInfo);
  }

  userdata(){
    return this.httpServe.get<any>(`${this.url}/tenant/?id=${localStorage.getItem('tenant')}`,this.httpOptions)
  }

  logout(){

    const message = `Are you sure you want to logout?`;
 
    const dialogData = new ConfirmDialogModel("Logout?", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){
        localStorage.clear();
        this.router.navigate(['']);
        this.login();
      }
    });

  }

  login(){
    const login = localStorage.getItem('loginData')
    const tenant = localStorage.getItem('tenant')
    const token = localStorage.getItem('token')
    if(login && tenant && token && this.router.navigate([''])){
      // this.navs=true;
      // this.show=true;
    }
    else{
    this.router.navigate(['login']);
    // this.navs=false;
    // this.show=false;
    }
    
  }

}
