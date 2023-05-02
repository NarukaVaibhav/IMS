import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PlacementdataService {

  url=`${this.address.getURL()}/company/`;
  urlplacement=`${this.address.getURL()}/admissionadmin?eligibleForPlacement=true`;
  urlwilling=`${this.address.getURL()}/placement?statuses=pending,not_intrested,intrested`;
  urltrack=`${this.address.getURL()}/placement?status=placed`;



  constructor(public http:HttpClient,
    private address : UrlService) {}


  delete(row){
    this.url=`${this.address.getURL()}/company/`;
    return this.http.delete(`${this.url}${row.id}`);
  }
  getting(){
    this.url=`${this.address.getURL()}/company/`;
    return this.http.get(this.url)
  }


  addcompany(object){
   console.log(object)
    return this.http.post<any>(`${this.address.getURL()}/company`,object);
  }


  edit(obj){
    this.url=`${this.address.getURL()}/company/`;
    return this.http.get(this.url+"?id="+obj)
  }

  updatecompany(object){
    this.url=`${this.address.getURL()}/company/`;
    // const id=object['id']
    return this.http.put<any>(this.url,object)
  }


}
