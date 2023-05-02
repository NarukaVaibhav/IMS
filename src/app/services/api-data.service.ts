import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  HttpHeaders
} from '@angular/common/http';
import {
  AttendanceComponent
} from '../Attendance/attendance/attendance.component';
import {
  UrlService
} from './url.service';

@Injectable({
  providedIn: 'root',

})
export class ApiDataService {
  public base_url = this.urlServe.getLoginURL;
  public url = `${this.urlServe.getURL}/course`;
  public course_id = String;
  public tenan = localStorage.getItem('tenant');
  public selected = '';
  public base_url_admission = '';
  fee_url = '';
  base_url_data;
  update_url
  urlse = this.urlServe.getURL();

  constructor(public http: HttpClient, private urlServe: UrlService) {

  }
  // Get Cource Name
  getCource() {
    return this.http.get < any > (`${this.urlServe.getURL()}/course?status=Active`);
  }

  //  Record Search
  bySearching(value) {
    return this.http.get < any > (`${this.urlServe.getURL()}/admissionsearch?data=${value}`)
  }

  // Get Batch Name
  getBatch(id) {
    let ids = id
    return this.http.get < any > (`${this.urlServe.getURL()}/batch?course=${ids}`)
  }

  //Get Student Details
  getDetails(id) {
    return this.http.get < any > (`${this.urlServe.getURL()}/admissionadmin?officeUseForm.batch.id=${id}`)
  }
  // Get Cource Data
  getCourseData() {

    this.base_url_data = this.base_url + localStorage.getItem('tenant') + "/course";
    return this.http.get(`${this.urlServe.getURL()}/course`);
  }
  //Get Student Data in Addmission Record
  getAdmission() {

    this.base_url_admission = this.base_url + this.tenan +
      "/admissionadmin?officeUseForm.batch.id=" + this.selected +
      "&fieldsToSelect=id,officeUseForm.batch,officeUseForm.course,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName";
    return this.http.get(`${this.urlServe.getURL()}/admissionadmin?officeUseForm.batch.id=${this.selected}&fieldsToSelect=id,officeUseForm.batch,officeUseForm.course,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName`);
  }
  // Get Fees
  getAdmissionFee() {

    this.fee_url = this.base_url + this.tenan + "/admissionadmin?officeUseForm.batch.id=" + this.selected;
    return this.http.get(this.fee_url);
  }

}
