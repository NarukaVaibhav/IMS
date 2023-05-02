import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  UrlService
} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  //*******************HEaderes ************** */


  _url = this.address.getURL();

  constructor(private _http: HttpClient, private address: UrlService) {}

  details = []

  // Load Data on Table
  getView() {
    return this._http.get < any > (`${this.address.getURL()}/getAllTeachers`);
  }

  // Store Temparary Data for next Component
  storeDetails(obj) {
    this.details = []
    this.details = obj
    console.log("Detais", this.details)
  }
  getStoreDetails() {
    return this.details
  }

  // Get Student Data
  admissionData(id) {
    let url = "admissionadmin?officeUseForm.batch.id="
    return this._http.get < any > (`${this.address.getURL()}/${url}${id}`);
  }
  studentDetail(id) {
    let url = "admissionadmin?id="
    return this._http.get < any > (`${this.address.getURL()}/${url}${id}`);
  }

  // Get Exam Record Data
  examData(id) {

    let url = "exam?batch.id=";
    let url2 = "&fieldsToSelect=all";
    return this._http.get < any > (`${this.address.getURL()}/${url}${id}${url2}`);
  }

  //Get FeedBack Data
  feedBackData(id) {
    let url = "feedback?batch.id=";
    return this._http.get < any > (`${this.address.getURL()}/${url}${id}`);
  }

  //Get Batch Data
  batch(id) {
    let url1 = "admissionadmin?officeUseForm.batch.id=";
    let url2 = "&fieldsToSelect=id,officeUseForm.batch,officeUseForm.course,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName"
    return this._http.get < any > (`${this.address.getURL()}/${url1}${id}${url2}`);
  }

  //Student Attendance Data
  attendence(id) {
    let url1 = "attendance?studentId="
    return this._http.get < any > (`${this.address.getURL()}/${url1}${id}`);
  }

}
