import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { UrlService } from './url.service';
import { ApiDataService } from './apidata.service';


@Injectable({
  providedIn: 'root'
})
export class FeeReceiptService {


  httpOptions = {
    headers: new HttpHeaders({
      "x-app-version": "12",
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    })
  };

  public base_url = this.address.getURL() ;
  url = `${this.base_url}/admissionsearch?data=`;

  update_url;


  constructor( public http : HttpClient , public service : ApiDataService , private address : UrlService ) { }

  getList(str)
  {
    this.httpOptions.headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.address.getURL()}/admissionsearch?data=${str}`,this.httpOptions);
  }


  sendFee(object){
    const id = object['id']
    console.log(id)

    this.update_url = this.url+"/admission/ "+ id;
    return this.http.put<any>( this.update_url, object, this.httpOptions);
  }



  updateTenant(obj){
    return this.http.put<any>(this.url, obj, this.httpOptions);
  }

  updateFeesReceipt(obj){
    return this.http.post<any>(this.url+"/feesreceipt",obj, this.httpOptions);
  }

}






