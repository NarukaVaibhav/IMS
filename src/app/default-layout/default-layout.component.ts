// import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewUsersService } from '../../app/services/view-users.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidebarModule } from 'ng-sidebar';
import{ToasterService} from '../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';
import{UrlService} from '../services/url.service';
import {RoleDATAService} from '../role-data.service';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.3s ease', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0s ease', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DefaultLayoutComponent implements OnInit {

  title = 'IMS';

  @ViewChild('ng-sidebar-container', {static:true}) sidenavContainer: SidebarModule;

  enquiryVisible = true;
  admissionVisible = true;
  payrollVisible = true;
  attendanceVisible = true;
  attendanceTableVisible = true;
  taskVisible = true;
  assignmentVisible = true;
  userTaskVisible = true;
  examVisible = true;
  taskConfigVisible = true;
  cMgmtVisible=true;
  projectVisible = true;
  usersVisible = true;
  recieptVisible = true;
  feeDetailVisible = true;
  feedbackVisible = true;
  placementVisible = true;
  masterVisible = true;
  systemVisible = true;

  loggedIn=false;
  _opened: boolean = false;
  iconTrue: boolean = true;
  width = '16rem';

  showProfile = false;
  ProfileName
  show=false;

  _dock:boolean = true;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  oneTimeOpen: boolean = false;
  drawerOpen = false;
  designation;

  private _mobileQueryListener: () => void;
  contentWidth: string;

availableroles:any=[];
  previewSIDEmenu=false;
GETroles() {
  this.http.getRoles().subscribe((res:any)=> {
    //console.log(res);
    if(res['results'] && res['results'].length>0){
      this.availableroles=res['results'];
      this.sidemenuRolemanage(this.availableroles[0].roles);

    }
  }, (err)=> {
 console.log(err);
  })

}


  submenuSHOW(index){
    this.SIDEMENUARR[index].showsub=!this.SIDEMENUARR[index].showsub;
  }

  //sidemenuRolemanage(roles:any){
  //  console.log(roles);
  //  for(let i=0;i<this.SIDEMENUARR.length;i++){
  //    if(!this.SIDEMENUARR[i].submenu && this.SIDEMENUARR[i].role.length==0){
  //      this.SIDEMENUARR[i].show=true;
  //      break;
  //    }else if(!this.SIDEMENUARR[i].submenu && this.SIDEMENUARR[i].role.length!=0){
  //             for(let j=0;j<this.SIDEMENUARR[i].role.length;j++){
  //               for(let k=0;k<roles.length;k++){
  //                 if(this.SIDEMENUARR[i].role[j]==roles[k].role_name){
  //                   this.SIDEMENUARR[i].show=true;
  //                   break;
  //                 }
  //               }
  //             }
  //    }else if(this.SIDEMENUARR[i].submenu){
  //            for(let a=0;a<this.SIDEMENUARR[i].sub.length;a++){
  //              if(this.SIDEMENUARR[i].sub[a].role.length==0){
  //                this.SIDEMENUARR[i].show=true;
  //                this.SIDEMENUARR[i].sub[a].show=true;
  //              }else {
  //                for(let l=0;l<this.SIDEMENUARR[i].sub[a].role.length;l++){
  //                  for(let k=0;k<roles.length;k++){
  //                    if(this.SIDEMENUARR[i].sub[a].role[l]==roles[k].role_name){
  //                      this.SIDEMENUARR[i].show=true;
  //                      this.SIDEMENUARR[i].sub[a].show=true;
  //                      break;
  //                    }
  //                  }
  //                }
  //              }
  //            }
  //    }
  //        }
  //
  //
  //  }


  //FORADMISIDEMENU(){
  //  for(let i=0;i<this.SIDEMENUARR.length;i++){
  //    this.SIDEMENUARR[i].show=true;
  //    if(this.SIDEMENUARR[i].submenu){
  //          for(let k=0;k<this.SIDEMENUARR[i].sub.length;k++){
  //            this.SIDEMENUARR[i].sub[k].show=true;
  //          }
  //    }
  //  }
  //}

  //FORTEACHERSIDEMENU(){
  //  let menu=['Task','Assignment','Exam','Course Management','Project','Feedback'];
  //  this.SIDEMENUARR=[
  //    {"name":"Payroll",show:true,onlyicon:false,icon:'local_atm',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Employee',show:false, route:'/Payroll/Employee/All_Emp',role:['add_empployee','get_emplist','edit_employee']},
  //      { "name": 'Attendance',show:true, route:'/Payroll/Attendance',role:['mark_attendance','show_attendance','show_all_attendance','edit_attendance']},
  //      { "name": 'Payroll',show:false, route:'/Payroll/Payroll-Overview',role:['payroll_overview']},
  //      { "name": 'Leaves',show:true, route:'/Payroll/Leaves',role:['payroll_leaveget','apply_leave','approve_rejectLeave']},
  //      { "name": 'Holidays',show:true, route:'/Payroll/Holidays',role:['add_holiday','get_holiday']},
  //      { "name": 'Pay Slip',show:true, route:'/Payroll/PaySlip',role:['payslip']}
  //    ],role:[]},
  //    {"name":"Task",show:true,onlyicon:false,icon:'check_box',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Add',show:true, route:'/Task/addtask',role:['manageTask_create']},
  //      { "name": 'View All',show:true, route:'/Task/viewtask',role:['manageTask_read', 'manageTask_update', 'manageTask_delete']}
  //    ],role:[]},
  //    {"name":"Assignment",show:true,onlyicon:false,icon:'assignment_turned_in',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Add',show:true, route:'/Assignment/assignment',role:['assignment_create']},
  //      { "name": 'View All',show:true, route:'/Assignment/assignment-ViewAll',role:['assignment_read', 'assignment_update', 'assignment_addAnswers', 'assignment_delete']}
  //    ],role:[]},
  //    {"name":"Exam",show:true,onlyicon:false,icon:'grading',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Add',show:true, route:'/Exam/add-exam',role:['exam_create']},
  //      { "name": 'View All',show:true, route:'/Exam/view',role:['exam_read', 'exam_getSessions','exam_updateSessions', 'exam_updateSubmission', 'exam_update', 'exam_startexam', 'exam_startexam', 'exam_delete','examanswer_create', 'examanswer_read', 'examanswer_delete', 'examanswer_deleteAnswersOfAdmission',]},
  //      { "name": 'Format',show:true, route:'/Exam/format-Exam',role:['examformat_create', 'examformat_read', 'examformat_update', 'examformat_delete']}
  //    ]},
  //    {"name":"Task Configuration",show:true,onlyicon:false,icon:'engineering',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Add',show:true, route:'/TaskConfig/addtaskconfig',role:['manageTask_create']},
  //      { "name": 'View All',show:true, route:'/TaskConfig/viewtaskconfig',role:['manageTask_read',  'manageTask_update', 'manageTask_delete']}
  //    ],role:[]},
  //    {"name":"Course Management",show:true,onlyicon:false,icon:'topic',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Batches',show:true, route:'/CourseMgmt/batches',role:['batch_create', 'batch_read', 'batch_update', 'batch_delete', 'batch_sendMessage', 'batch_sendMessageToTeacher', ]},
  //      { "name": 'Courses',show:true, route:'/CourseMgmt/courses',role:[ 'course_create', 'course_read', 'course_update', 'course_delete']},
  //      { "name": 'Sub courses',show:true, route:'/CourseMgmt/subcourses',role:['subcourse_create', 'subcourse_read', 'subcourse_update', 'subcourse_delete']},
  //      { "name": 'Subjects',show:true, route:'/CourseMgmt/subjects',role:['subject_create', 'subject_read', 'subject_update', 'subject_delete']},
  //      { "name": 'Chapter',show:true, route:'/CourseMgmt/chapter',role:[]},
  //      { "name": 'topic',show:true, route:'/CourseMgmt/topic',role:[]},
  //      { "name": 'Questions',show:true, route:'/CourseMgmt/questions',role:[]}
  //    ],role:[]},
  //    {"name":"Project",show:true,onlyicon:false,icon:'work',route:'',submenu:true,showsub:false,sub:[
  //      { "name": 'Add',show:true, route:'/Project/addproject',role:['project_create']},
  //      { "name": 'View All',show:true, route:'/Project/viewproject',role:['project_read',  'project_update', 'project_delete']}
  //    ],role:[]},
  //  ];
  //
  //}

    showONLUICON=false;

  //SIDEMENUARR=[
  //  {"name":"Dashboard",show:false,onlyicon:false,icon:'home',route:'/dashboard',submenu:false,sub:[],role:['dashboard_staff_birthdays', 'dashboard_stats', 'history_read']},
  //  {"name":"Enquiries",show:false,onlyicon:false,icon:'smartphone',route:'',submenu:true,showsub:false,sub:[
  //    {"name":"Add",show:false,route:'/Enquiry/add-enquiry',role:['enquiry_create']},
  //    {"name":"View All",show:false,route:'/Enquiry/view-enquiry',role:['enquiry_read', 'enquiry_update', 'enquiry_delete']},
  //  ],role:[]},
  //  {"name":"Admission",show:false,onlyicon:false,icon:'insert_drive_file',route:'',submenu:true,showsub:false,sub:[
  //    {"name":"Add",show:false,route:'/Admission/add-new-admission',role:['admission_create']},
  //    {"name":"View All",show:false,route:'/Admission/view-admissions',role:['admission_read', 'admission_update', 'admission_delete']},
  //  ],role:[]},
  //  {"name":"Payroll",show:false,onlyicon:false,icon:'local_atm',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Employee',show:false, route:'/Payroll/Employee/All_Emp',role:[]},
  //    { "name": 'Attendance',show:false, route:'/Payroll/Attendance',role:[]},
  //    { "name": 'Payroll',show:false, route:'/Payroll/Payroll-Overview',role:[]},
  //    { "name": 'Leaves',show:false, route:'/Payroll/Leaves',role:[]},
  //    { "name": 'Holidays',show:false, route:'/Payroll/Holidays',role:[]},
  //    { "name": 'Pay Slip',show:false, route:'/Payroll/PaySlip',role:[]}
  //  ],role:[]},
  //  {"name":"Attendance",show:false,onlyicon:false,icon:'person',route:'/Attendance/attendance',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
  //  {"name":"Attendance Sheet",show:false,onlyicon:false,icon:'group',route:'/Attendance/attendance-sheet',submenu:false,sub:[],role:['attendance_create', 'attendance_read', 'attendance_update', 'attendance_delete', 'attendance_addMultipleAttendance']},
  //  {"name":"Task",show:false,onlyicon:false,icon:'check_box',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/Task/addtask',role:['manageTask_create']},
  //    { "name": 'View All',show:false, route:'/Task/viewtask',role:['manageTask_read', 'manageTask_update', 'manageTask_delete']}
  //  ],role:[]},
  //  {"name":"Assignment",show:false,onlyicon:false,icon:'assignment_turned_in',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/Assignment/assignment',role:['assignment_create']},
  //    { "name": 'View All',show:false, route:'/Assignment/assignment-ViewAll',role:['assignment_read', 'assignment_update', 'assignment_addAnswers', 'assignment_delete']}
  //  ],role:[]},
  //  {"name":"User Task",show:false,onlyicon:false,icon:'event_note',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'View All',show:false, route:'/UserTask/userTasks-viewall',role:[]}
  //  ],role:[]},
  //  {"name":"Exam",show:false,onlyicon:false,icon:'grading',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/Exam/add-exam',role:['exam_create']},
  //    { "name": 'View All',show:false, route:'/Exam/view',role:['exam_read', 'exam_getSessions','exam_updateSessions', 'exam_updateSubmission', 'exam_update', 'exam_startexam', 'exam_startexam', 'exam_delete','examanswer_create', 'examanswer_read', 'examanswer_delete', 'examanswer_deleteAnswersOfAdmission',]},
  //    { "name": 'Format',show:false, route:'/Exam/format-Exam',role:['examformat_create', 'examformat_read', 'examformat_update', 'examformat_delete']}
  //  ]},
  //  {"name":"Task Configuration",show:false,onlyicon:false,icon:'engineering',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/TaskConfig/addtaskconfig',role:['manageTask_create']},
  //    { "name": 'View All',show:false, route:'/TaskConfig/viewtaskconfig',role:['manageTask_read',  'manageTask_update', 'manageTask_delete']}
  //  ],role:[]},
  //  {"name":"Course Management",show:false,onlyicon:false,icon:'topic',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Batches',show:false, route:'/CourseMgmt/batches',role:['batch_create', 'batch_read', 'batch_update', 'batch_delete', 'batch_sendMessage', 'batch_sendMessageToTeacher', ]},
  //    { "name": 'Courses',show:false, route:'/CourseMgmt/courses',role:[ 'course_create', 'course_read', 'course_update', 'course_delete']},
  //    { "name": 'Sub courses',show:false, route:'/CourseMgmt/subcourses',role:['subcourse_create', 'subcourse_read', 'subcourse_update', 'subcourse_delete']},
  //    { "name": 'Subjects',show:false, route:'/CourseMgmt/subjects',role:['subject_create', 'subject_read', 'subject_update', 'subject_delete']},
  //    { "name": 'Chapter',show:false, route:'/CourseMgmt/chapter',role:[]},
  //    { "name": 'topic',show:false, route:'/CourseMgmt/topic',role:[]},
  //    { "name": 'Questions',show:false, route:'/CourseMgmt/questions',role:[]}
  //  ],role:[]},
  //  {"name":"Project",show:false,onlyicon:false,icon:'work',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/Project/addproject',role:['project_create']},
  //    { "name": 'View All',show:false, route:'/Project/viewproject',role:['project_read',  'project_update', 'project_delete']}
  //  ],role:[]},
  //  {"name":"Users",show:false,onlyicon:false,icon:'account_box',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add',show:false, route:'/User/add-user',role:['users_create']},
  //    { "name": 'View All',show:false, route:'/User/view-all-users',role:[ 'users_read', 'users_update', 'users_search', 'users_delete',]}
  //  ],role:[]},
  //  {"name":"Receipt",show:false,onlyicon:false,icon:'receipt',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'View All',show:false, route:'/Receipt/receipt',role:['feestype_read']}
  //  ],role:[]},
  //  {"name":"Reset Login",show:false,onlyicon:false,icon:'shuffle',route:'/reset-login',submenu:false,sub:[],role:['logins_delete']},
  //  {"name":"Fee Details",show:false,onlyicon:false,icon:'payments',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'View Fee Details',show:false, route:'/FeeDetails/feedetails',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']},
  //    { "name": 'Fee Receipt',show:false, route:'/FeeDetails/fee-receipt',role:['feestype_create', 'feestype_read', 'feestype_update', 'feestype_delete']}
  //  ],role:[]},
  //  {"name":"Feedback",show:false,onlyicon:false,icon:'rate_review',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Add Feedback',show:false, route:'/Feedback/add-feedback',role:['feedback_create']},
  //    { "name": 'View All',show:false, route:'/Feedback/feedback-view',role:['feedback_read', 'feedback_update', 'feedback_delete', 'feedback_addAnswers']},
  //    { "name": 'Add Employee Feedback',show:false, route:'/Feedback/add-employee-feedback',role:[]},
  //    { "name": 'View Employee Feedback',show:false, route:'/Feedback/view-employee-feedback',role:[]},
  //  ],role:[]},
  //  {"name":"Placement",show:false,onlyicon:false,icon:'supervised_user_circle',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Placement Drive',show:false, route:'/Placement/placementdrive',role:['placement_read', 'placement_create', 'placement_update', 'placement_delete', 'placement_sendMessage']},
  //    { "name": 'Add Company',show:false, route:'/Placement/addcompany',role:['company_create']},
  //    { "name": 'View Placement',show:false, route:'/Placement/viewplacement',role:['company_read', 'company_update', 'company_delete',]},
  //  ]},
  //  {"name":"Master",show:false,onlyicon:false,icon:'app_settings_alt',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Designation',show:false, route:'/Master/master-designation',role:['designations_read', 'designations_create', 'designations_update', 'designations_delete']},
  //    { "name": 'Followup',show:false, route:'/Master/master-followup',role:[ 'followUpMode_create', 'followUpMode_read', 'followUpMode_update', 'followUpMode_delete']},
  //    { "name": 'Admission ID Master',show:false, route:'/Master/AdmissionMaster',role:[]},
  //  ],role:[]},
  //  {"name":"System",show:false,onlyicon:false,icon:'settings',route:'',submenu:true,showsub:false,sub:[
  //    { "name": 'Skill Bharat',show:false, route:'/System/skill-bharat',role:['admin']},
  //    { "name": 'Tenant',show:false, route:'/System/tenant-config',role:['admin']}
  //  ],role:[]},
  //  {"name":"Teachers",show:false,onlyicon:false,icon:'shuffle',route:'/teacher/teachers',submenu:false,sub:[],role:['admin']},
  //];
  //



  SIDEMENUARR:any=[];
  constructor(public dialog: MatDialog, public toast:ToasterService, private router: Router,showngeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private modalService: NgbModal, public user: ViewUsersService,public http:UrlService
  ,public role:RoleDATAService){
  let designation=JSON.parse(localStorage.getItem('loginData'))['designation'];
    if(designation!="Default Admin" && designation != "Admin" && designation != "ADMIN"){
      if(designation=="Teacher"){
          console.log('teacher');
        this.SIDEMENUARR=this.role.FORTEACHERSIDEMENU();
        //this.FORTEACHERSIDEMENU();
      }else{
        console.log("other")
        if(!this.role.getROles() || !this.role.getsideMenu()){
          this.toast.infocustomhead("Re-login Required",'Info');
          localStorage.clear();
          this.router.navigate(['login']);
        }else{
          this.SIDEMENUARR=this.role.getsideMenu();
        }

        //this.GETroles();
      }

    }else{
      this.previewSIDEmenu=true;
      this.SIDEMENUARR=this.role.FORADMISIDEMENU();
      console.log("ADMIN")
    }

  this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => showngeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(){
    document.documentElement.style.setProperty('--block-width','85%');
    document.documentElement.style.setProperty('--sidebar-length','257px');

    this.user.row_obj=[]

    try{
      this.designation =JSON.parse(localStorage.getItem('loginData'))['designation']
      console.log(this.designation +"@@@")
    }catch{
      this.designation = "NA";
      console.log(this.designation +"@@")
    }

    // if(designation == "Teacher")
    // {
    //   this.teacherLoign=true
    //   // this.router.navigate(['/main'])
    // }
    // else
    // {
    //   this.teacherLoign=false

    // }

    if(localStorage.getItem('token')!=null){
      // this.loggedIn = true
      this._opened=!this._opened;
      this.ProfileName =  JSON.parse(localStorage.getItem('loginData'))['name'];
    }



  }

  openDialog(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  _toggleOpened(): void {

    this._opened = !this._opened;
    if(this._opened){
      document.documentElement.style.setProperty('--block-width','85%');
      document.documentElement.style.setProperty('--sidebar-length','257px');
      // content[0].style.right="100";
      this.iconTrue = true;
    }else{
      document.documentElement.style.setProperty('--block-width','100%');
      document.documentElement.style.setProperty('--sidebar-length','-70px');
      // document.documentElement.style.setProperty('--close1-left','100% !important');
      // document.documentElement.style.setProperty('--close2-transform','translateX(-100%) !important');
      // document.documentElement.style.setProperty('--close3-margin','auto !important');

      // content[0].style.right="0";
      this.iconTrue = false;
      this.payrollVisible = true;
      this.enquiryVisible = true;
      this.admissionVisible = true;
      this.attendanceVisible = true;
      this.attendanceTableVisible = true;
      this.taskVisible = true;
      this.assignmentVisible = true;
      this.userTaskVisible = true;
      this.examVisible = true;
      this.taskConfigVisible = true;
      this.cMgmtVisible=true;
      this.projectVisible = true;
      this.usersVisible = true;
      this.recieptVisible = true;
      this.feeDetailVisible = true;
      this.feedbackVisible = true;
      this.placementVisible = true;
      this.masterVisible = true;
      this.systemVisible = true;
    }


    if(this.iconTrue){
      this.width = '4rem';
    }

  }

  oneTimeToggle() {

    this._opened = true;
    this.iconTrue = true;
    if(this._opened){
      document.documentElement.style.setProperty('--block-width','85%');
      document.documentElement.style.setProperty('--sidebar-length','257px');
      // content[0].style.right="100";
      this.iconTrue = true;
    }else{
      document.documentElement.style.setProperty('--block-width','100%');
      document.documentElement.style.setProperty('--sidebar-length','-70px');
      // document.documentElement.style.setProperty('--close1-left','100% !important');
      // document.documentElement.style.setProperty('--close2-transform','translateX(-100%) !important');
      // document.documentElement.style.setProperty('--close3-margin','auto !important');

    }
    // if(this.oneTimeOpen == false){
    //   this.iconTrue = !this.iconTrue;
    //   this.oneTimeOpen = true;
    // }else{
    //   this.iconTrue = false;
    // }


  }

  closeBackDrop(){
    this.oneTimeOpen = false;
    this.enquiryVisible = true;
    this.admissionVisible = true;
    this.payrollVisible = true;
    this.attendanceVisible = true;
    this.attendanceTableVisible = true;
    this.taskVisible = true;
    this.assignmentVisible = true;
    this.userTaskVisible = true;
    this.examVisible = true;
    this.taskConfigVisible = true;
    this.cMgmtVisible=true;
    this.projectVisible = true;
    this.usersVisible = true;
    this.recieptVisible = true;
    this.feeDetailVisible = true;
    this.feedbackVisible = true;
    this.placementVisible = true;
    this.masterVisible = true;
    this.systemVisible = true;

    this.iconTrue = !this.iconTrue;
  }

  showProfileDrop(){
    this.showProfile = !this.showProfile;
  }

  login(){
    const login = localStorage.getItem('loginData')
    const tenant = localStorage.getItem('tenant')
    const token = localStorage.getItem('token')
    if(login && tenant && token && this.router.navigate([''])){
      // this.navs=true;
      // this.show=true;
    }
    else{
      this.router.navigate(['login']);
      // this.navs=false;
      // this.show=false;
    }

  }

  logout(){

    const message = `Are you sure you want to logout?`;

    const dialogData = new ConfirmDialogModel("Logout?", message);

    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){
        this.loggedIn = false;
        localStorage.clear();
        this.router.navigate(['']);
        this.login();
      }
    });
  }

  toggleDisplay(menuName){
    this.enquiryVisible = true;
    this.admissionVisible = true;
    this.payrollVisible = true;
    this.attendanceVisible = true;
    this.attendanceTableVisible = true;
    this.taskVisible = true;
    this.assignmentVisible = true;
    this.userTaskVisible = true;
    this.examVisible = true;
    this.taskConfigVisible = true;
    this.cMgmtVisible=true;
    this.projectVisible = true;
    this.usersVisible = true;
    this.recieptVisible = true;
    this.feeDetailVisible = true;
    this.feedbackVisible = true;
    this.placementVisible = true;
    this.masterVisible = true;
    this.systemVisible = true;

    if(menuName == 'enquiry'){
     this.enquiryVisible = !this.enquiryVisible;
    }
    if(menuName == 'admission'){
     this.admissionVisible = !this.admissionVisible;
    }
    if(menuName == 'payroll'){
     this.payrollVisible = !this.payrollVisible;
    }
    if(menuName == 'task'){
     this.taskVisible = !this.taskVisible;
    }
    if(menuName == 'assignment'){
     this.assignmentVisible = !this.assignmentVisible;
    }
    if(menuName == 'userTask'){
     this.userTaskVisible = !this.userTaskVisible;
    }
    if(menuName == 'exam'){
     this.examVisible = !this.examVisible;
    }
    if(menuName == 'taskConfig'){
     this.taskConfigVisible = !this.taskConfigVisible;
    }
    if(menuName == 'courseMgmt'){
     this.cMgmtVisible = !this.cMgmtVisible;
    }
    if(menuName == 'project'){
     this.projectVisible = !this.projectVisible;
    }
    if(menuName == 'users'){
     this.usersVisible = !this.usersVisible;
    }
    if(menuName == 'reciept'){
     this.recieptVisible = !this.recieptVisible;
    }
    if(menuName == 'feeDetail'){
     this.feeDetailVisible = !this.feeDetailVisible;
    }
    if(menuName == 'feedback'){
     this.feedbackVisible = !this.feedbackVisible;
    }
    if(menuName == 'placement'){
     this.placementVisible = !this.placementVisible;
    }
    if(menuName == 'master'){
     this.masterVisible = !this.masterVisible
    }
    if(menuName == 'system'){
     this.systemVisible = !this.systemVisible;
    }

    this.drawerOpen = true;

  }

  editProfile(){

    let obj={}
    obj = JSON.parse(localStorage.getItem('loginData'))

    this.user.editUser(obj).subscribe(res=>
      this.user.row_obj.push(obj)
      )


   this.router.navigate(['edit-profile'])

  }

}
