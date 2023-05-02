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
export class AssignmentService {

  // ******************URL***********
  _url = this.address.getURL();
  ids = this.address.ids();
  assignBatch = this.address.assignBatches();

  constructor(private _http: HttpClient, private address: UrlService) {}

  // Get Assignment on table
  getView() {
    if (JSON.parse(localStorage.getItem('loginData'))['designation']== "Teacher") {
      return this._http.get < any > (`${this.address.getURL()}/assignment?batchesToSelect=${this.assignBatch}`);
    } else {
      return this._http.get < any > (`${this.address.getURL()}/assignment`);

    }

  }


  //Delete Assignment on table
  delete(row) {
    return this._http.delete(`${this.address.getURL()}/assignment/${row}`);
  }


  //Edit Assignment data on table
  put(object) {
    const id = object['id']
    return this._http.put < any > (`${this.address.getURL()}/assignment/${id}`, object);
  }

  //ADD Assignment data
  postData(data) {
    return this._http.post < any > (`${this.address.getURL()}/assignment`, data);
  }

  // Get Batch Data
  batch() {

    if (JSON.parse(localStorage.getItem('loginData'))['designation']== "Teacher") {
      return this._http.get < any > (`${this.address.getURL()}/batch?teacher.id=${this.ids}`)
    } else {
      return this._http.get < any > (`${this.address.getURL()}/batch`)
    }

  }

  // Get Assignmnet Record
  record(id) {
    return this._http.get < any > (`${this.address.getURL()}/assignment?id=${id}`);
  }


  // Get Student Data
  record2(id) {
    let ass_URL = "admissionadmin?officeUseForm.batch.id=";
    let field = "&fieldsToSelect=id,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName";
    return this._http.get < any > (`${this.address.getURL()}/${ass_URL}${id}${field}`);
  }


  // Get Assignment Submission  Data
  indiviual_submission(id) {
    return this._http.get < any > (`${this.address.getURL()}/user?admissionId=${id}`);
  }


  // Add ID
  assignmentIds = [];
  edit = false

  addId(bi) {
    this.assignmentIds.unshift(bi)
    this.edit = true
  }

  getid() {
    return this.assignmentIds
  }


  //Assignment Edit
  editAssignment(object) {

    const id = object['id']
    return this._http.put < any > (`${this.address.getURL()}/assignment/${id}`, object);
  }
}
