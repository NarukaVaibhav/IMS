import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import{ToasterService} from './Toast/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDATAService {

  constructor(public router:Router,public toast:ToasterService) { }

  sidemenuRolemanage(roles:any){
    console.log(roles);
    for(let i=0;i<this.SIDEMENUARR.length;i++){
      if(!this.SIDEMENUARR[i].submenu && this.SIDEMENUARR[i].role.length==0){
        this.SIDEMENUARR[i].show=true;
        break;
      }else if(!this.SIDEMENUARR[i].submenu && this.SIDEMENUARR[i].role.length!=0){
        for(let j=0;j<this.SIDEMENUARR[i].role.length;j++){
          for(let k=0;k<roles.length;k++){
            if(this.SIDEMENUARR[i].role[j]==roles[k].role_name){
              this.SIDEMENUARR[i].show=true;
              break;
            }
          }
        }
      }else if(this.SIDEMENUARR[i].submenu){
        for(let a=0;a<this.SIDEMENUARR[i].sub.length;a++){
          if(this.SIDEMENUARR[i].sub[a].role.length==0){
            this.SIDEMENUARR[i].show=true;
            this.SIDEMENUARR[i].sub[a].show=true;
          }else {
            for(let l=0;l<this.SIDEMENUARR[i].sub[a].role.length;l++){
              for(let k=0;k<roles.length;k++){
                if(this.SIDEMENUARR[i].sub[a].role[l]==roles[k].role_name){
                  this.SIDEMENUARR[i].show=true;
                  this.SIDEMENUARR[i].sub[a].show=true;
                  break;
                }
              }
            }
          }
        }
      }

    }

    this.saveROles(roles);
    this.saveSideMenu(this.SIDEMENUARR);
    this.router.navigate(['/dashboard']);

  }

  saveROles(availablerole){
    localStorage.setItem("Roles",JSON.stringify(availablerole));
  }

  getROles(){
    try{
      return JSON.parse(localStorage.getItem("Roles"));
    }catch (e){
      return false;
    }

  }


  saveSideMenu(arrside){
    localStorage.setItem("Menu",JSON.stringify(arrside));
  }

  getsideMenu(){
    try{
      return JSON.parse(localStorage.getItem("Menu"));
    }
    catch (e){
      return false;
      //this.toast.infocustomhead("Re-login Required",'Info');
      //localStorage.clear();
      //this.router.navigate(['login']);
    }

  }

  FORADMISIDEMENU(){
    return [
      {"name":"Dashboard",show:true,onlyicon:false,icon:'home',route:'/dashboard',submenu:false,sub:[],role:['dashboard_staff_birthdays', 'dashboard_stats', 'history_read']},
      {"name":"Enquiries",show:true,onlyicon:false,icon:'smartphone',route:'',submenu:true,showsub:false,sub:[
        {"name":"Add",show:true,route:'/Enquiry/add-enquiry',role:['enquiry_create']},
        {"name":"View All",show:true,route:'/Enquiry/view-enquiry',role:['enquiry_read', 'enquiry_update', 'enquiry_delete']},
      ],role:[]},
      {"name":"Admission",show:true,onlyicon:false,icon:'insert_drive_file',route:'',submenu:true,showsub:false,sub:[
        {"name":"Add",show:true,route:'/Admission/add-new-admission',role:['admission_create']},
        {"name":"View All",show:true,route:'/Admission/view-admissions',role:['admission_read', 'admission_update', 'admission_delete']},
      ],role:[]},
      {"name":"Payroll",show:true,onlyicon:false,icon:'local_atm',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Employee',show:true, route:'/Payroll/Employee/All_Emp',role:[]},
        { "name": 'Attendance',show:true, route:'/Payroll/Attendance',role:[]},
        { "name": 'Payroll',show:true, route:'/Payroll/Payroll-Overview',role:[]},
        { "name": 'Leaves',show:true, route:'/Payroll/Leaves',role:[]},
        { "name": 'Holidays',show:true, route:'/Payroll/Holidays',role:[]},
        { "name": 'Pay Slip',show:true, route:'/Payroll/PaySlip',role:[]}
      ],role:[]},
      {"name":"Attendance",show:true,onlyicon:false,icon:'person',route:'/Attendance/attendance',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
      {"name":"Attendance Sheet",show:true,onlyicon:false,icon:'group',route:'/Attendance/attendance-sheet',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
      {"name":"Task",show:true,onlyicon:false,icon:'check_box',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Task/addtask',role:['manageTask_create']},
        { "name": 'View All',show:true, route:'/Task/viewtask',role:['manageTask_read', 'manageTask_update', 'manageTask_delete']}
      ],role:[]},
      {"name":"Assignment",show:true,onlyicon:false,icon:'assignment_turned_in',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Assignment/assignment',role:['assignment_create']},
        { "name": 'View All',show:true, route:'/Assignment/assignment-ViewAll',role:['assignment_read', 'assignment_update', 'assignment_addAnswers', 'assignment_delete']}
      ],role:[]},
      {"name":"User Task",show:true,onlyicon:false,icon:'event_note',route:'',submenu:true,showsub:false,sub:[
        { "name": 'View All',show:true, route:'/UserTask/userTasks-viewall',role:[]}
      ],role:[]},
      {"name":"Exam",show:true,onlyicon:false,icon:'grading',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Exam/add-exam',role:['exam_create']},
        { "name": 'View All',show:true, route:'/Exam/view',role:['exam_read', 'exam_getSessions','exam_updateSessions', 'exam_updateSubmission', 'exam_update', 'exam_startexam', 'exam_startexam', 'exam_delete','examanswer_create', 'examanswer_read', 'examanswer_delete', 'examanswer_deleteAnswersOfAdmission',]},
        { "name": 'Format',show:true, route:'/Exam/format-Exam',role:['examformat_create', 'examformat_read', 'examformat_update', 'examformat_delete']}
      ]},
      {"name":"Task Configuration",show:true,onlyicon:false,icon:'engineering',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/TaskConfig/addtaskconfig',role:['manageTask_create']},
        { "name": 'View All',show:true, route:'/TaskConfig/viewtaskconfig',role:['manageTask_read',  'manageTask_update', 'manageTask_delete']}
      ],role:[]},
      {"name":"Course Management",show:true,onlyicon:false,icon:'topic',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Batches',show:true, route:'/CourseMgmt/batches',role:['batch_create', 'batch_read', 'batch_update', 'batch_delete', 'batch_sendMessage', 'batch_sendMessageToTeacher', ]},
        { "name": 'Courses',show:true, route:'/CourseMgmt/courses',role:[ 'course_create', 'course_read', 'course_update', 'course_delete']},
        { "name": 'Sub courses',show:true, route:'/CourseMgmt/subcourses',role:['subcourse_create', 'subcourse_read', 'subcourse_update', 'subcourse_delete']},
        { "name": 'Subjects',show:true, route:'/CourseMgmt/subjects',role:['subject_create', 'subject_read', 'subject_update', 'subject_delete']},
        { "name": 'Chapter',show:true, route:'/CourseMgmt/chapter',role:[]},
        { "name": 'topic',show:true, route:'/CourseMgmt/topic',role:[]},
        { "name": 'Questions',show:true, route:'/CourseMgmt/questions',role:[]}
      ],role:[]},
      {"name":"Project",show:true,onlyicon:false,icon:'work',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Project/addproject',role:['project_create']},
        { "name": 'View All',show:true, route:'/Project/viewproject',role:['project_read',  'project_update', 'project_delete']}
      ],role:[]},
      {"name":"Users",show:true,onlyicon:false,icon:'account_box',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/User/add-user',role:['users_create']},
        { "name": 'View All',show:true, route:'/User/view-all-users',role:[ 'users_read', 'users_update', 'users_search', 'users_delete',]}
      ],role:[]},
      {"name":"Receipt",show:true,onlyicon:false,icon:'receipt',route:'',submenu:true,showsub:false,sub:[
        { "name": 'View All',show:true, route:'/Receipt/receipt',role:['feestype_read']}
      ],role:[]},
      {"name":"Reset Login",show:true,onlyicon:false,icon:'shuffle',route:'/reset-login',submenu:false,sub:[],role:['logins_delete']},
      {"name":"Fee Details",show:true,onlyicon:false,icon:'payments',route:'',submenu:true,showsub:false,sub:[
        { "name": 'View Fee Details',show:true, route:'/FeeDetails/feedetails',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']},
        { "name": 'Fee Receipt',show:true, route:'/FeeDetails/fee-receipt',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']}
      ],role:[]},
      {"name":"Feedback",show:true,onlyicon:false,icon:'rate_review',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add Feedback',show:true, route:'/Feedback/add-feedback',role:['feedback_create']},
        { "name": 'View All',show:true, route:'/Feedback/feedback-view',role:['feedback_read', 'feedback_update', 'feedback_delete', 'feedback_addAnswers']},
        { "name": 'Add Employee Feedback',show:true, route:'/Feedback/add-employee-feedback',role:[]},
        { "name": 'View Employee Feedback',show:true, route:'/Feedback/view-employee-feedback',role:[]},
      ],role:[]},
      {"name":"Placement",show:true,onlyicon:false,icon:'supervised_user_circle',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Placement Drive',show:true, route:'/Placement/placementdrive',role:['placement_read', 'placement_create', 'placement_update', 'placement_delete', 'placement_sendMessage']},
        { "name": 'Add Company',show:true, route:'/Placement/addcompany',role:['company_create']},
        { "name": 'View Placement',show:true, route:'/Placement/viewplacement',role:['company_read', 'company_update', 'company_delete',]},
      ]},
      {"name":"Master",show:true,onlyicon:false,icon:'app_settings_alt',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Designation',show:true, route:'/Master/master-designation',role:['designations_read', 'designations_create', 'designations_update', 'designations_delete']},
        { "name": 'Followup',show:true, route:'/Master/master-followup',role:[ 'followUpMode_create', 'followUpMode_read', 'followUpMode_update', 'followUpMode_delete']},
        { "name": 'Admission ID Master',show:true, route:'/Master/AdmissionMaster',role:[]},
      ],role:[]},
      {"name":"System",show:true,onlyicon:false,icon:'settings',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Skill Bharat',show:true, route:'/System/skill-bharat',role:['admin']},
        { "name": 'Tenant',show:true, route:'/System/tenant-config',role:['admin']}
      ],role:[]},
      {"name":"Teachers",show:true,onlyicon:false,icon:'shuffle',route:'/teacher/teachers',submenu:false,sub:[],role:['admin']},
    ];
    //for(let i=0;i<this.SIDEMENUARR.length;i++){
    //  this.SIDEMENUARR[i].show=true;
    //  if(this.SIDEMENUARR[i].submenu){
    //    for(let k=0;k<this.SIDEMENUARR[i].sub.length;k++){
    //      this.SIDEMENUARR[i].sub[k].show=true;
    //    }
    //  }
    //}
  }

  FORTEACHERSIDEMENU(){
    let menu=['Task','Assignment','Exam','Course Management','Project','Feedback'];
    return [
      {"name":"Payroll",show:true,onlyicon:false,icon:'local_atm',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Employee',show:false, route:'/Payroll/Employee/All_Emp',role:['add_empployee','get_emplist','edit_employee']},
        { "name": 'Attendance',show:true, route:'/Payroll/Attendance',role:['mark_attendance','show_attendance','show_all_attendance','edit_attendance']},
        { "name": 'Payroll',show:false, route:'/Payroll/Payroll-Overview',role:['payroll_overview']},
        { "name": 'Leaves',show:true, route:'/Payroll/Leaves',role:['payroll_leaveget','apply_leave','approve_rejectLeave']},
        { "name": 'Holidays',show:true, route:'/Payroll/Holidays',role:['add_holiday','get_holiday']},
        { "name": 'Pay Slip',show:true, route:'/Payroll/PaySlip',role:['payslip']}
      ],role:[]},
      {"name":"Task",show:true,onlyicon:false,icon:'check_box',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Task/addtask',role:['manageTask_create']},
        { "name": 'View All',show:true, route:'/Task/viewtask',role:['manageTask_read', 'manageTask_update', 'manageTask_delete']}
      ],role:[]},
      {"name":"Feedback",show:true,onlyicon:false,icon:'rate_review',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add Feedback',show:true, route:'/Feedback/add-feedback',role:['feedback_create']},
        { "name": 'View All',show:true, route:'/Feedback/feedback-view',role:['feedback_read', 'feedback_update', 'feedback_delete', 'feedback_addAnswers']},
        { "name": 'Add Employee Feedback',show:true, route:'/Feedback/add-employee-feedback',role:[]},
        { "name": 'View Employee Feedback',show:true, route:'/Feedback/view-employee-feedback',role:[]},
      ],role:[]},
      {"name":"Assignment",show:true,onlyicon:false,icon:'assignment_turned_in',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Assignment/assignment',role:['assignment_create']},
        { "name": 'View All',show:true, route:'/Assignment/assignment-ViewAll',role:['assignment_read', 'assignment_update', 'assignment_addAnswers', 'assignment_delete']}
      ],role:[]},
      {"name":"Exam",show:true,onlyicon:false,icon:'grading',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Exam/add-exam',role:['exam_create']},
        { "name": 'View All',show:true, route:'/Exam/view',role:['exam_read', 'exam_getSessions','exam_updateSessions', 'exam_updateSubmission', 'exam_update', 'exam_startexam', 'exam_startexam', 'exam_delete','examanswer_create', 'examanswer_read', 'examanswer_delete', 'examanswer_deleteAnswersOfAdmission',]},
        { "name": 'Format',show:true, route:'/Exam/format-Exam',role:['examformat_create', 'examformat_read', 'examformat_update', 'examformat_delete']}
      ]},
      {"name":"Task Configuration",show:true,onlyicon:false,icon:'engineering',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:false, route:'/TaskConfig/addtaskconfig',role:['manageTask_create']},
        { "name": 'View All',show:true, route:'/TaskConfig/viewtaskconfig',role:['manageTask_read',  'manageTask_update', 'manageTask_delete']}
      ],role:[]},
      {"name":"Course Management",show:true,onlyicon:false,icon:'topic',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Batches',show:true, route:'/CourseMgmt/batches',role:['batch_create', 'batch_read', 'batch_update', 'batch_delete', 'batch_sendMessage', 'batch_sendMessageToTeacher', ]},
        { "name": 'Courses',show:true, route:'/CourseMgmt/courses',role:[ 'course_create', 'course_read', 'course_update', 'course_delete']},
        { "name": 'Sub courses',show:true, route:'/CourseMgmt/subcourses',role:['subcourse_create', 'subcourse_read', 'subcourse_update', 'subcourse_delete']},
        { "name": 'Subjects',show:true, route:'/CourseMgmt/subjects',role:['subject_create', 'subject_read', 'subject_update', 'subject_delete']},
        { "name": 'Chapter',show:true, route:'/CourseMgmt/chapter',role:[]},
        { "name": 'topic',show:true, route:'/CourseMgmt/topic',role:[]},
        { "name": 'Questions',show:true, route:'/CourseMgmt/questions',role:[]}
      ],role:[]},
      {"name":"Project",show:true,onlyicon:false,icon:'work',route:'',submenu:true,showsub:false,sub:[
        { "name": 'Add',show:true, route:'/Project/addproject',role:['project_create']},
        { "name": 'View All',show:true, route:'/Project/viewproject',role:['project_read',  'project_update', 'project_delete']}
      ],role:[]},
    ];

  }

  SIDEMENUARR:any=[
    {"name":"Dashboard",show:false,onlyicon:false,icon:'home',route:'/dashboard',submenu:false,sub:[],role:['dashboard_staff_birthdays', 'dashboard_stats', 'history_read']},
    {"name":"Enquiries",show:false,onlyicon:false,icon:'smartphone',route:'',submenu:true,showsub:false,sub:[
      {"name":"Add",show:false,route:'/Enquiry/add-enquiry',role:['enquiry_create']},
      {"name":"View All",show:false,route:'/Enquiry/view-enquiry',role:['enquiry_read', 'enquiry_update', 'enquiry_delete']},
    ],role:[]},
    {"name":"Admission",show:false,onlyicon:false,icon:'insert_drive_file',route:'',submenu:true,showsub:false,sub:[
      {"name":"Add",show:false,route:'/Admission/add-new-admission',role:['admission_create']},
      {"name":"View All",show:false,route:'/Admission/view-admissions',role:['admission_read', 'admission_update', 'admission_delete']},
    ],role:[]},
    {"name":"Payroll",show:false,onlyicon:false,icon:'local_atm',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Employee',show:false, route:'/Payroll/Employee/All_Emp',role:[]},
      { "name": 'Attendance',show:false, route:'/Payroll/Attendance',role:[]},
      { "name": 'Payroll',show:false, route:'/Payroll/Payroll-Overview',role:[]},
      { "name": 'Leaves',show:false, route:'/Payroll/Leaves',role:[]},
      { "name": 'Holidays',show:false, route:'/Payroll/Holidays',role:[]},
      { "name": 'Pay Slip',show:false, route:'/Payroll/PaySlip',role:[]}
    ],role:[]},
    {"name":"Attendance",show:false,onlyicon:false,icon:'person',route:'/Attendance/attendance',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
    {"name":"Attendance Sheet",show:false,onlyicon:false,icon:'group',route:'/Attendance/attendance-sheet',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
    {"name":"Task",show:false,onlyicon:false,icon:'check_box',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/Task/addtask',role:['manageTask_create']},
      { "name": 'View All',show:false, route:'/Task/viewtask',role:['manageTask_read', 'manageTask_update', 'manageTask_delete']}
    ],role:[]},
    {"name":"Assignment",show:false,onlyicon:false,icon:'assignment_turned_in',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/Assignment/assignment',role:['assignment_create']},
      { "name": 'View All',show:false, route:'/Assignment/assignment-ViewAll',role:['assignment_read', 'assignment_update', 'assignment_addAnswers', 'assignment_delete']}
    ],role:[]},
    {"name":"User Task",show:false,onlyicon:false,icon:'event_note',route:'',submenu:true,showsub:false,sub:[
      { "name": 'View All',show:false, route:'/UserTask/userTasks-viewall',role:[]}
    ],role:[]},
    {"name":"Exam",show:false,onlyicon:false,icon:'grading',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/Exam/add-exam',role:['exam_create']},
      { "name": 'View All',show:false, route:'/Exam/view',role:['exam_read', 'exam_getSessions','exam_updateSessions', 'exam_updateSubmission', 'exam_update', 'exam_startexam', 'exam_startexam', 'exam_delete','examanswer_create', 'examanswer_read', 'examanswer_delete', 'examanswer_deleteAnswersOfAdmission',]},
      { "name": 'Format',show:false, route:'/Exam/format-Exam',role:['examformat_create', 'examformat_read', 'examformat_update', 'examformat_delete']}
    ]},
    {"name":"Task Configuration",show:false,onlyicon:false,icon:'engineering',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/TaskConfig/addtaskconfig',role:['manageTask_create']},
      { "name": 'View All',show:false, route:'/TaskConfig/viewtaskconfig',role:['manageTask_read',  'manageTask_update', 'manageTask_delete']}
    ],role:[]},
    {"name":"Course Management",show:false,onlyicon:false,icon:'topic',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Batches',show:false, route:'/CourseMgmt/batches',role:['batch_create', 'batch_read', 'batch_update', 'batch_delete', 'batch_sendMessage', 'batch_sendMessageToTeacher', ]},
      { "name": 'Courses',show:false, route:'/CourseMgmt/courses',role:[ 'course_create', 'course_read', 'course_update', 'course_delete']},
      { "name": 'Sub courses',show:false, route:'/CourseMgmt/subcourses',role:['subcourse_create', 'subcourse_read', 'subcourse_update', 'subcourse_delete']},
      { "name": 'Subjects',show:false, route:'/CourseMgmt/subjects',role:['subject_create', 'subject_read', 'subject_update', 'subject_delete']},
      { "name": 'Chapter',show:false, route:'/CourseMgmt/chapter',role:[]},
      { "name": 'topic',show:false, route:'/CourseMgmt/topic',role:[]},
      { "name": 'Questions',show:false, route:'/CourseMgmt/questions',role:[]}
    ],role:[]},
    {"name":"Project",show:false,onlyicon:false,icon:'work',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/Project/addproject',role:['project_create']},
      { "name": 'View All',show:false, route:'/Project/viewproject',role:['project_read',  'project_update', 'project_delete']}
    ],role:[]},
    {"name":"Users",show:false,onlyicon:false,icon:'account_box',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add',show:false, route:'/User/add-user',role:['users_create']},
      { "name": 'View All',show:false, route:'/User/view-all-users',role:[ 'users_read', 'users_update', 'users_search', 'users_delete',]}
    ],role:[]},
    {"name":"Receipt",show:false,onlyicon:false,icon:'receipt',route:'',submenu:true,showsub:false,sub:[
      { "name": 'View All',show:false, route:'/Receipt/receipt',role:['feestype_read']}
    ],role:[]},
    {"name":"Reset Login",show:false,onlyicon:false,icon:'shuffle',route:'/reset-login',submenu:false,sub:[],role:['logins_delete']},
    {"name":"Fee Details",show:false,onlyicon:false,icon:'payments',route:'',submenu:true,showsub:false,sub:[
      { "name": 'View Fee Details',show:false, route:'/FeeDetails/feedetails',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']},
      { "name": 'Fee Receipt',show:false, route:'/FeeDetails/fee-receipt',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']}
    ],role:[]},
    {"name":"Feedback",show:false,onlyicon:false,icon:'rate_review',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Add Feedback',show:false, route:'/Feedback/add-feedback',role:['feedback_create']},
      { "name": 'View All',show:false, route:'/Feedback/feedback-view',role:['feedback_read', 'feedback_update', 'feedback_delete', 'feedback_addAnswers']},
      { "name": 'Add Employee Feedback',show:false, route:'/Feedback/add-employee-feedback',role:[]},
      { "name": 'View Employee Feedback',show:false, route:'/Feedback/view-employee-feedback',role:[]},
    ],role:[]},
    {"name":"Placement",show:false,onlyicon:false,icon:'supervised_user_circle',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Placement Drive',show:false, route:'/Placement/placementdrive',role:['placement_read', 'placement_create', 'placement_update', 'placement_delete', 'placement_sendMessage']},
      { "name": 'Add Company',show:false, route:'/Placement/addcompany',role:['company_create']},
      { "name": 'View Placement',show:false, route:'/Placement/viewplacement',role:['company_read', 'company_update', 'company_delete',]},
    ]},
    {"name":"Master",show:false,onlyicon:false,icon:'app_settings_alt',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Designation',show:false, route:'/Master/master-designation',role:['designations_read', 'designations_create', 'designations_update', 'designations_delete']},
      { "name": 'Followup',show:false, route:'/Master/master-followup',role:[ 'followUpMode_create', 'followUpMode_read', 'followUpMode_update', 'followUpMode_delete']},
      { "name": 'Admission ID Master',show:false, route:'/Master/AdmissionMaster',role:[]},
    ],role:[]},
    {"name":"System",show:false,onlyicon:false,icon:'settings',route:'',submenu:true,showsub:false,sub:[
      { "name": 'Skill Bharat',show:false, route:'/System/skill-bharat',role:['admin']},
      { "name": 'Tenant',show:false, route:'/System/tenant-config',role:['admin']}
    ],role:[]},
    {"name":"Teachers",show:false,onlyicon:false,icon:'shuffle',route:'/teacher/teachers',submenu:false,sub:[],role:['admin']},
  ];

}
