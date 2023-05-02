import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewUsersService } from '../app/services/view-users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidebarModule } from 'ng-sidebar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  // title = 'IMS';

  // @ViewChild('ng-sidebar-container', {static:true}) sidenavContainer: SidebarModule;

  // enquiryVisible = true;
  // admissionVisible = true;
  // payrollVisible = true;
  // attendanceVisible = true;
  // attendanceTableVisible = true;
  // taskVisible = true;
  // assignmentVisible = true;
  // userTaskVisible = true;
  // examVisible = true;
  // taskConfigVisible = true;
  // cMgmtVisible=true;
  // projectVisible = true;
  // usersVisible = true;
  // recieptVisible = true;
  // feeDetailVisible = true;
  // feedbackVisible = true;
  // placementVisible = true;
  // masterVisible = true;
  // systemVisible = true;
  
  // loggedIn=false;
  // _opened: boolean = false;
  // iconTrue: boolean = true;
  // width = '16rem';

  // showProfile = false;
  // ProfileName 
  // show=false;

  // _dock:boolean = true;

  // mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  // oneTimeOpen: boolean = false;
  // drawerOpen = false;

  // private _mobileQueryListener: () => void;
  // contentWidth: string;

  // constructor(private router: Router,showngeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
  //   private modalService: NgbModal, public user: ViewUsersService){
  //     this.mobileQuery = media.matchMedia('(max-width: 600px)');
  //   this._mobileQueryListener = () => showngeDetectorRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  //   }
  //   teacherLoign=false
  // ngOnInit(){
  //   this.user.row_obj=[]
  //   let desination;
  //   try{
  //     desination =JSON.parse(localStorage.getItem('loginData'))['designation']            
  //   }catch{
  //     desination = "NA";
      
  //   }

  //   if(desination == "Teacher")
  //   {
  //     this.teacherLoign=true
  //     // this.router.navigate(['/main'])
  //   }
  //   else
  //   {
  //     this.teacherLoign=false
      
  //   }

  //   if(localStorage.getItem('token')!=null){
  //     this.loggedIn = true
  //     this._opened=!this._opened;
  //     this.ProfileName =  JSON.parse(localStorage.getItem('loginData'))['name'];
  //   }

  //   if(localStorage.getItem('token')==null){
  //     this.loggedIn = false;
  //     this.router.navigate(["/login"]);
  //     return;
  //   }
    
  //   this.loggedIn=true;
  //   // this.route.navigate(["/dashboard"]);
    
  // }

  // openDialog(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //   }, (reason) => {
  //   });
  // }
  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }

  // _toggleOpened(): void {

  //   this._opened = !this._opened;
  //   if(this._opened){
  //     document.documentElement.style.setProperty('--block-width','85%');
  //     document.documentElement.style.setProperty('--sidebar-length','257px');
  //     // content[0].style.right="100";
  //     this.iconTrue = true;
  //   }else{
  //     document.documentElement.style.setProperty('--block-width','100%');
  //     document.documentElement.style.setProperty('--sidebar-length','-70px');
  //     // document.documentElement.style.setProperty('--close1-left','100% !important');
  //     // document.documentElement.style.setProperty('--close2-transform','translateX(-100%) !important');
  //     // document.documentElement.style.setProperty('--close3-margin','auto !important');
    
  //     // content[0].style.right="0";
  //     this.iconTrue = false;
  //     this.payrollVisible = true;
  //     this.enquiryVisible = true;
  //     this.admissionVisible = true;
  //     this.attendanceVisible = true;
  //     this.attendanceTableVisible = true;
  //     this.taskVisible = true;
  //     this.assignmentVisible = true;
  //     this.userTaskVisible = true;
  //     this.examVisible = true;
  //     this.taskConfigVisible = true;
  //     this.cMgmtVisible=true;
  //     this.projectVisible = true;
  //     this.usersVisible = true;
  //     this.recieptVisible = true;
  //     this.feeDetailVisible = true;
  //     this.feedbackVisible = true;
  //     this.placementVisible = true;
  //     this.masterVisible = true;
  //     this.systemVisible = true;
  //   }

  //   // if(this._opened == true){
  //   //   this.contentWidth = '85%';
  //   // }
  //   // else if(this._opened == false){
  //   //   this.contentWidth = '95%';
  //   // }

  //   // if(this.drawerOpen == false){
  //   //   this.iconTrue = !this.iconTrue;
  //   //   this.oneTimeOpen = true;
  //   // }else{
  //   //   this.oneTimeOpen = true;
  //   //   this.enquiryVisible = true;
  //   //   this.admissionVisible = true;
  //   //   this.attendanceVisible = true;
  //   //   this.attendanceTableVisible = true;
  //   //   this.taskVisible = true;
  //   //   this.assignmentVisible = true;
  //   //   this.userTaskVisible = true;
  //   //   this.examVisible = true;
  //   //   this.taskConfigVisible = true;
  //   //   this.cMgmtVisible=true;
  //   //   this.projectVisible = true;
  //   //   this.usersVisible = true;
  //   //   this.recieptVisible = true;
  //   //   this.feeDetailVisible = true;
  //   //   this.feedbackVisible = true;
  //   //   this.placementVisible = true;
  //   //   this.masterVisible = true;
  //   //   this.systemVisible = true;

  //   //   this.iconTrue = !this.iconTrue;
  //   // }

  //   if(this.iconTrue){
  //     this.width = '4rem';
  //   }

  // }

  // oneTimeToggle() {

  //   this._opened = true;
  //   this.iconTrue = true;
  //   if(this._opened){
  //     document.documentElement.style.setProperty('--block-width','85%');
  //     document.documentElement.style.setProperty('--sidebar-length','257px');
  //     // content[0].style.right="100";
  //     this.iconTrue = true;
  //   }else{
  //     document.documentElement.style.setProperty('--block-width','100%');
  //     document.documentElement.style.setProperty('--sidebar-length','-70px');
  //     // document.documentElement.style.setProperty('--close1-left','100% !important');
  //     // document.documentElement.style.setProperty('--close2-transform','translateX(-100%) !important');
  //     // document.documentElement.style.setProperty('--close3-margin','auto !important');
    
  //   }
  //   // if(this.oneTimeOpen == false){
  //   //   this.iconTrue = !this.iconTrue;
  //   //   this.oneTimeOpen = true;
  //   // }else{
  //   //   this.iconTrue = false;
  //   // }

    
  // }
  
  // closeBackDrop(){
  //   this.oneTimeOpen = false;
  //   this.enquiryVisible = true;
  //   this.admissionVisible = true;
  //   this.payrollVisible = true;
  //   this.attendanceVisible = true;
  //   this.attendanceTableVisible = true;
  //   this.taskVisible = true;
  //   this.assignmentVisible = true;
  //   this.userTaskVisible = true;
  //   this.examVisible = true;
  //   this.taskConfigVisible = true;
  //   this.cMgmtVisible=true;
  //   this.projectVisible = true;
  //   this.usersVisible = true;
  //   this.recieptVisible = true;
  //   this.feeDetailVisible = true;
  //   this.feedbackVisible = true;
  //   this.placementVisible = true;
  //   this.masterVisible = true;
  //   this.systemVisible = true;

  //   this.iconTrue = !this.iconTrue;
  // }

  // showProfileDrop(){
  //   this.showProfile = !this.showProfile;
  // }
 
  // login(){
  //   const login = localStorage.getItem('loginData')
  //   const tenant = localStorage.getItem('tenant')
  //   const token = localStorage.getItem('token')
  //   if(login && tenant && token && this.router.navigate([''])){
  //     // this.navs=true;
  //     // this.show=true;
  //   }
  //   else{
  //   this.router.navigate(['login']);
  //   // this.navs=false;
  //   // this.show=false;
  //   }
    
  // }

  // logout(){
  //   if(confirm("Are you sure..?")){
  //   this.loggedIn = false;
  //   localStorage.clear();
  //   this.router.navigate(['']);
  //   this.login();
  //   }
  // }

  // toggleDisplay(menuName){
  //   this.enquiryVisible = true;
  //   this.admissionVisible = true;
  //   this.payrollVisible = true;
  //   this.attendanceVisible = true;
  //   this.attendanceTableVisible = true;
  //   this.taskVisible = true;
  //   this.assignmentVisible = true;
  //   this.userTaskVisible = true;
  //   this.examVisible = true;
  //   this.taskConfigVisible = true;
  //   this.cMgmtVisible=true;
  //   this.projectVisible = true;
  //   this.usersVisible = true;
  //   this.recieptVisible = true;
  //   this.feeDetailVisible = true;
  //   this.feedbackVisible = true;
  //   this.placementVisible = true;
  //   this.masterVisible = true;
  //   this.systemVisible = true;
    
  //   if(menuName == 'enquiry'){
  //    this.enquiryVisible = !this.enquiryVisible;
  //   }
  //   if(menuName == 'admission'){
  //    this.admissionVisible = !this.admissionVisible;
  //   }
  //   if(menuName == 'payroll'){
  //    this.payrollVisible = !this.payrollVisible;
  //   }
  //   if(menuName == 'task'){
  //    this.taskVisible = !this.taskVisible;
  //   }
  //   if(menuName == 'assignment'){
  //    this.assignmentVisible = !this.assignmentVisible;
  //   }
  //   if(menuName == 'userTask'){
  //    this.userTaskVisible = !this.userTaskVisible;
  //   }
  //   if(menuName == 'exam'){
  //    this.examVisible = !this.examVisible;
  //   }
  //   if(menuName == 'taskConfig'){
  //    this.taskConfigVisible = !this.taskConfigVisible;
  //   }
  //   if(menuName == 'courseMgmt'){
  //    this.cMgmtVisible = !this.cMgmtVisible;
  //   }
  //   if(menuName == 'project'){
  //    this.projectVisible = !this.projectVisible;
  //   }
  //   if(menuName == 'users'){
  //    this.usersVisible = !this.usersVisible;
  //   }
  //   if(menuName == 'reciept'){
  //    this.recieptVisible = !this.recieptVisible;
  //   }
  //   if(menuName == 'feeDetail'){
  //    this.feeDetailVisible = !this.feeDetailVisible;
  //   }
  //   if(menuName == 'feedback'){
  //    this.feedbackVisible = !this.feedbackVisible;
  //   }
  //   if(menuName == 'placement'){
  //    this.placementVisible = !this.placementVisible;
  //   }
  //   if(menuName == 'master'){
  //    this.masterVisible = !this.masterVisible
  //   }
  //   if(menuName == 'system'){
  //    this.systemVisible = !this.systemVisible;
  //   }
    
  //   this.drawerOpen = true;

  // }

  // editProfile(){
    
  //   let obj={}
  //   obj = JSON.parse(localStorage.getItem('loginData'))

  //   this.user.editUser(obj).subscribe(res=>
  //     this.user.row_obj.push(obj)
  //     )
    

  //  this.router.navigate(['edit-profile'])

  // }

}
