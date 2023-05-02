import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

 constructor( public http : HttpClient , public urlimport:UrlService) {}

  url = this.urlimport.getURL();

  getdata(str)
  {
   return this.http.get(this.url+"/logins?emailId="+str);
  }

  deletedata(obj){
    const id = obj["id"]
    return this.http.delete(this.urlimport.getURL()+ "/logins/" + id)
  }
}
