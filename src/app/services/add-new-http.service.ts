/**
 * This servive belongs to Aashish Kumar Sahu, please save his stipend and
 * certificate by not tampering with the code. Thank You.
 */

import { UrlService } from './url.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddNewHTTPService {
   

  constructor(protected addServe: HttpClient, public urlimport:UrlService) {}

  url = this.urlimport.getURL();
  loginId = this.urlimport.ids();
  designation = this.urlimport.designations();


  private examResultData;
  private examResultStudentData;
  private assignmentData;
  private assignmentStudentData;
  private feedbackData;

  setExamData(examData, studentData){
    this.examResultData = examData;
    this.examResultStudentData = studentData;
  }

  getExamData(){
    return [this.examResultData, this.examResultStudentData];
  }

  getEditAdmissionData(id){
    return this.addServe.get(`${this.urlimport.getURL()}/admissionadmin?id=${id}`);
  }

  updateAdmissions(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/admission/${id}`, data);
  }

  getTableData(){
    return this.addServe.get<any>(`${this.urlimport.getURL()}/admissionadmin?fieldsToSelect=id,officeUseForm.batch,officeUseForm.course,officeUseForm.admissionType,officeUseForm.dateOfRegistration,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName,officeUseForm.collegeName,receipt.payableMode,receipt.dueFees,accountStatus,status`);
  }

  getAttendanceData(batchId, studentId){
    return this.addServe.get(`${this.urlimport.getURL()}/attendance?batch=${batchId}&studentId=${studentId}`);
  }

  getExamResultData(batchId){
    return this.addServe.get(`${this.urlimport.getURL()}/exam?batch.id=${batchId}&fieldsToSelect=name`);
  }

  getResultRecord(id){
    return this.addServe.get(`${this.urlimport.getURL()}/exam?fieldsToSelect=all&id=${id}`);
  }

  getAssignmentData(id){
    return this.addServe.get(`${this.urlimport.getURL()}/assignment?batch.id=${id}&fieldsToSelect=name`);
  }


  getAssignmentRecord(id){
    return this.addServe.get(`${this.urlimport.getURL()}/assignment?id=${id}`);
  }

  getAssignmentUserRecord(id){
    return this.addServe.get(`${this.urlimport.getURL()}/user?admissionId=${id}`);
  }

  setterForAssignmentData(assignmentPayLoad, assignmentStudentPayLoad){
    this.assignmentData = assignmentPayLoad;
    this.assignmentStudentData = assignmentStudentPayLoad;
  }

  getterForAssignmentData(){
    return [this.assignmentData, this.assignmentStudentData];
  }

  getResultRecordStudentData(id){
    return this.addServe.get(`${this.urlimport.getURL()}/admissionadmin?id=${id}&fieldsToSelect=basicDetails.photos.resized.dataURL,basicDetails.studentName,basicDetails.mobileNumber,basicDetails.emailID`);
  }


  getFeedbackNames(id){
    return this.addServe.get(`${this.urlimport.getURL()}/feedback?batch.id=${id}&fieldsToSelect=feedbackTitle,name`);
  }

  getFeedbackRecord(id){
    return this.addServe.get(`${this.urlimport.getURL()}/feedback?id=${id}`);
  }

  setterForFeedbackData(feedbackPayLoad){
    this.feedbackData = feedbackPayLoad;
  }

  getterForFeedbackData(){
    return this.feedbackData;
  }


  removeTableEntry(deleteID){
    return this.addServe.delete(`${this.urlimport.getURL()}/admission/${deleteID}`);
  }

  updateAdmissionStatus(id, payload) {
    return this.addServe.put(`${this.urlimport.getURL()}/admission/${id}`, payload);
  }

  // fetch all the course names
  getCourse() {
    return this.addServe.get(`${this.urlimport.getURL()}/course?status=Active`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  getBatch(id){
    return this.addServe.get(`${this.urlimport.getURL()}/batch?course=${id}`,
    {
      headers: new HttpHeaders({
        "x-app-version": "12",
      })
    });
  }

  postForm(submission){
    return this.addServe.post(`${this.urlimport.getURL()}/admission`, submission);
  }
  
  postFormReceipt(payload){
    return this.addServe.post(`${this.urlimport.getURL()}/feesreceipt`, payload);
  }

  // fetch all the subjects for course management
  getSubject(id, status){
    if(status == true){
      return this.addServe.get(`${this.urlimport.getURL()}/subject?subcourse.id=${id}&status=Active`);
    }else{
      return this.addServe.get(`${this.urlimport.getURL()}/subject?course.id=${id}&status=Active`);
    }
  }

  getTeacherNames(){
    return this.addServe.get(`${this.urlimport.getURL()}/user?designation=Teacher`);
  }

  // upload batch
  uploadBatch(batch){
    return this.addServe.post(`${this.urlimport.getURL()}/batch`, batch);

  }

  getAdmissionInfoForBatches(id){
    return this.addServe.get(`${this.urlimport.getURL()}/admissionadmin?officeUseForm.batch.id=${id}&fieldsToSelect=id,officeUseForm.batch,officeUseForm.course,officeUseForm.collegeName,basicDetails.mobileNumber,basicDetails.fatherName,basicDetails.studentName,receipt`);
  }

  // get batch data
  getBatchData(){
    var link = `${this.urlimport.getURL()}/batch`;
    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/batch?teacher.id=${this.loginId}`;
    }

    return this.addServe.get(link);
  }

  getSubCourseForSubjects(id) {
    return this.addServe.get(`${this.urlimport.getURL()}/subcourse?course.id=${id}`);
  }

  deleteBatch(deleteID){
    return this.addServe.delete(`${this.urlimport.getURL()}/batch/${deleteID}`);
  }

  getBatchIds(){
    return this.addServe.get(`${this.urlimport.getURL()}/batch?teacher.id=${this.loginId}&fieldsToSelect=id`)
  }

  getCourseTable(batchIds){
    var link = `${this.urlimport.getURL()}/course?fieldsToSelect=name,tenant,id,parent,fee,status,sbCourseId`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/course?fieldsToSelect=name,tenant,id,parent,sbCourseId&ids=${batchIds}`;
    }
    return this.addServe.get(link);
    // 5e006ab6341bbea52174a9f8,5e006a30341bbea52174a9f0,5c0b9d30c6add1882f77a524

  }

  putBatchUpdate(id, payload){
    return this.addServe.put(`${this.urlimport.getURL()}/batch/${id}`, payload);
  }

  // Course Management add Courses
  addCourse(courseData){
    return this.addServe.post(`${this.urlimport.getURL()}/course`, courseData);
  }

  deleteCourse(deleteID){
    return this.addServe.delete(`${this.urlimport.getURL()}/course/${deleteID}`);
  }

  editCourse(id){
    return this.addServe.get(`${this.urlimport.getURL()}/subject?id=${id}`);
  }

  sendMessageToTeacher(msg){
    return this.addServe.post(`${this.urlimport.getURL()}/batch/sendMessageToTeacher`, msg);
  }

  sendMessageToAll(msg){
    return this.addServe.post(`${this.urlimport.getURL()}/batch/sendMessage`, msg);
  }

  editCourseCourses(data){
    return this.addServe.put(`${this.urlimport.getURL()}/course/5e395ec431daf3301da7b32f`, data);
  }


  activateCourse(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/course/${id}`, data);
  }


  getSubCourse(ids){
    var link = `${this.urlimport.getURL()}/subcourse`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/subcourse?courseIds=${ids}`;
    }
    return this.addServe.get(link);
  }

  getCourseForSubCourse(){
    return this.addServe.get(`${this.urlimport.getURL()}/course`);
  }

  postSubCoursse(data){
    return this.addServe.post(`${this.urlimport.getURL()}/subcourse`, data);
  }


  editSubCourse(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/subcourse/${id}`, data);
  }

  deleteSubCourse(id){
    return this.addServe.delete(`${this.urlimport.getURL()}/subcourse/${id}`);
  }


  activateSubCourse(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/subcourse/${id}`, data);
  }


  getBatchList(ids){
    var link = `${this.urlimport.getURL()}/subject`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/subject?courseIds=${ids}`;
    }
    return this.addServe.get(link);
  }

  // http://52.231.10.96:9000/api/v1.0/5b0671d4272275b43c6be5bc/
  addSubject(payload){
    return this.addServe.post(`${this.urlimport.getURL()}/subject`, payload);
  }

  getSubjectCourses(){
    return this.addServe.get(`${this.urlimport.getURL()}/course?status=Active`);
  }

  editSubjectPUT(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/subject/${id}`, data);
  }

  deleteSubject(id){
    return this.addServe.delete(`${this.urlimport.getURL()}/subject/${id}`);
  }

  deactivateSubject(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/subject/${id}`, data);
  }

  getSBCourses(){
    return this.addServe.get(`${this.urlimport.getURL()}/lms/courses?fieldsToSelect=name`, {
      headers: new HttpHeaders({
        "x-app-version": "12"
      })
    });
  }


  getSubCourseForBatches(id) {
    return this.addServe.get(`${this.urlimport.getURL()}/subcourse?course.id=${id}&status=Active`);
  }


  getSBSubcourse(id){
    return this.addServe.get(`${this.urlimport.getURL()}/lms/subjects?course.id=${id}`, {
      headers: new HttpHeaders({
        "x-app-version": "12"
      })
    });
  }

  mapSBCourse(id, data){
    return this.addServe.put(`${this.urlimport.getURL()}/subject/${id}`, data);
  }


  ////////////// Chapter Module
  getChapters(ids){
    var link = `${this.urlimport.getURL()}/chapter`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/chapter?courseIds=${ids}`;
    }
    return this.addServe.get(link);
  }

  postChapter(data){
    return this.addServe.post(`${this.urlimport.getURL()}/chapter`, data);
  }

  updateChapter(data){
    return this.addServe.put(`${this.url}/chapter`, data);
  }

  deleteChapter(id){
    return this.addServe.delete(`${this.urlimport.getURL()}/chapter/${id}`);
  }

  deactivateChapter(data){
    return this.addServe.put(`${this.urlimport.getURL()}/chapter`, data);
  }


  ////////////// Topic Module
  getTopics(ids){
    var link = `${this.urlimport.getURL()}/topic`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/topic?courseIds=${ids}`;
    }
    return this.addServe.get(link);
  }

  postTopic(data){
    return this.addServe.post(`${this.urlimport.getURL()}/topic`, data);
  }

  updateTopic(data){
    return this.addServe.put(`${this.url}/topic`, data);
  }

  deleteTopic(id){
    return this.addServe.delete(`${this.urlimport.getURL()}/topic/${id}`);
  }

  deactivateTopic(data){
    return this.addServe.put(`${this.urlimport.getURL()}/topic`, data);
  }

  getChapterForTopics(id){
    return this.addServe.get(`${this.urlimport.getURL()}/chapter?subject.id=${id}&fieldsToSelect=name,id&status=Active`);
  }


  ////////////// Questions Module
  getQuestions(ids){

    var link = `${this.urlimport.getURL()}/question`;

    if(this.designation == "Teacher"){
      link = `${this.urlimport.getURL()}/question?courseIds=${ids}`;
    }
    return this.addServe.get(link);
  }

  getTopicsForQuestions(id){
    return this.addServe.get(`${this.urlimport.getURL()}/topic?chapter.id=${id}&status=Active`)
  }

  postQuestion(data){
    return this.addServe.post(`${this.urlimport.getURL()}/question`, data);
  }

  updateQuestion(data){
    return this.addServe.put(`${this.urlimport.getURL()}/question`, data);
  }

  deleteQuestion(id){
    return this.addServe.delete(`${this.urlimport.getURL()}/question/${id}`);
  }

  // deactivateTopic(data){
  //   return this.addServe.put(`${this.url}/topic`, data);
  // }

  // getChapterForTopics(id){
  //   return this.addServe.get(`${this.url}/chapter?subject.id=${id}&fieldsToSelect=name,id&status=Active`);
  // }

  ///////////////////// Dashboard
  getDashboardSpecificCounts(){
    return this.addServe.get(`${this.urlimport.getURL()}/dashboard/getDashboardSpecificCounts`);
  }

  getCalendarData(){
    return this.addServe.get(`${this.urlimport.getURL()}/dashboard/getStaffBirthdays`);
  }

  getTimelineData(){
    return this.addServe.get(`${this.urlimport.getURL()}/history?limit=50`);
  }

}
