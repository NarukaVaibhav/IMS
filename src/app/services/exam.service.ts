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
export class ExamService {

  //*******************Headers********* */
  _url = this.address.getURL();
  id = this.address.ids();
  designation = this.address.designatio();



  constructor(private _http: HttpClient,
    private address: UrlService) {}


  getResult(examid,admissionid){
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/exam/getStudentAnswers/`+examid+'/'+admissionid);
  }


  //Exam Format get
  onGet() {
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/examformat`);
  }

  sendData(data) {
    return this._http.post < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam`, data)
  }

  //Get Bathces
  allAssignedBatches() {
    return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/batch?teacher.id=${JSON.parse(localStorage.getItem('loginData'))['id']}&fieldsToSelect=id`)
  }

  onBatch() {
    if (JSON.parse(localStorage.getItem('loginData'))['designation'] == "Teacher") {
      return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/batch?teacher.id=${this.id}`)
    } else {
      return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/batch`)
    }


  }
  //Get Exam Data for Edit
  edit(id) {
    return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam?id=${id}&fieldsToSelect=all`)
  }

  //Exam Update 
  updateExam(obj) {

    const id = obj['id'];
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${id}`, obj);
  }



  //****************Exam Format Service Part */

  //Get Exam Format
  examFormat() {
    return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/examformat`);

  }

  //Edit in Exam Format
  editFormat(object) {
    const id = object['id']
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/examformat/${id}`, object);
  }

  //Add New Exam
  post(data) {

    return this._http.post < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/examformat`, data);
  }

  ExamName = ''


  // ************************Exam View ********************


  //Store Exam Name For next component
  storeExamName(val) {
    this.ExamName = '';
    this.ExamName = val;
  }
  getExamName() {
    return this.ExamName
  }

  onView() {
    if (JSON.parse(localStorage.getItem('loginData'))['designation']  == "Teacher") {
      
      return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam?fieldsToSelect=id,name,date,examStartTime,examEndTime,batch,status,showResults&batchesToSelect=${this.address.assignBatches()}`);
    } else {
      
      return this._http.get < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam?fieldsToSelect=id,name,date,examStartTime,examEndTime,batch,status,showResults`);

    }
  }

  //Get Exam Id for next Component 

  getId(row) {
    let ids = row;
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/exam/session?examId=${ids}`)

  }

  

  // Student Details Get
  admissionDetails(row) {
    const fields = "&fieldsToSelect=basicDetails.photos.resized.dataURL,basicDetails.studentName,basicDetails.fatherName,basicDetails.mobileNumber,basicDetails.phoneNumber,basicDetails.emailID,officeUseForm.course.name,officeUseForm.batch.name";
    let ids;
    ids = row;
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/admissionadmin?ids=${ids}${fields}`)
  }

  //Exam Answer Data 
  examEnswer(row) {
    let ids;
    ids = row;
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/examanswer?examId=${ids}`)
  }

  //Delete Exam Record
  deleteExam(row) {
    return this._http.delete(`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${row}`);
  }

  //Get Passcode of Exam
  getPassCode(row) {
    let field = "&fieldsToSelect=examPasscode,passcodeUpdatedAt";
    return this._http.get(`${this.address.cURL}${localStorage.getItem('tenant')}/exam?id=${row}${field}`)
  }

  //Edit in Exam Data
  editExam(object) {
    const id = object['id']
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${id}`, object);

  }

  //Exam Terminate
  haultExam(obj) {
    const id = obj['id'];
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/updateExamSessions/${id}`, obj);
  }

  //Resume Exam 
  resumeExam2(obj) {
    // console.clear();
    // console.log("asdsa", obj)
    const id = obj['examId'];
    console.log("ASD", id)
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/updateExamSessions/${id}`, obj);
  }
  resumeExam(obj) {
    const id = obj['id'];
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${id}`, obj);
  }

  //Clone Exam 
  clone(obj) {
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/cloneBulkExams`, obj);
  }

  //Terminate Exam 
  terminate(obj) {
    const id = obj['id'];
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${id}`, obj);
  }

  //Activate Exam
  activate(obj) {

    const id = obj['id'];
    return this._http.put < any > (`${this.address.cURL}${localStorage.getItem('tenant')}/exam/${id}`, obj);
  }

}
