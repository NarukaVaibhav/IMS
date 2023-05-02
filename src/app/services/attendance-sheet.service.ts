import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSheetService {

  tenant= localStorage.getItem("tenant")

  url=`${this.address.getURL()}/batch?fieldsToSelect=id,name,teacher.name,timmingFrom,timmingTo,createdAt,status&status=Active`;
  attendanceurl=`${this.address.getURL()}/attendance?batch=`



  constructor(public http:HttpClient,
    private address : UrlService) { }

  getting(){
    return this.http.get(`${this.address.getURL()}/batch?fieldsToSelect=id,name,teacher.name,timmingFrom,timmingTo,createdAt,status&status=Active`)
  }

  attendance(id){
    return this.http.get(`${this.address.getURL()}/batch?fieldsToSelect=id,name,teacher.name,timmingFrom,timmingTo,createdAt,status&status=Active`+id);
  }

}
