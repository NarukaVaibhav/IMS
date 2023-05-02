import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';
import {Router} from "@angular/router";
import { HttpService} from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';




@Component({
  selector: 'app-system-skill-bharat',
  templateUrl: './system-skill-bharat.component.html',
  styleUrls: ['./system-skill-bharat.component.css']
})
export class SystemSkillBharatComponent implements OnInit {

  url
  email
  pass
  tenant
  course=''
  tenantDetails = []

  courses=[]
  ims_courses=[]
  filtered_course=[]

  selectedCourses = []

  show: boolean = false;


  constructor(private system_service : SystemService,
              private router : Router,
              private http : HttpService,
              private toastr: ToastrService,
              private dialog :MatDialog) { }

  ngOnInit() {

    this.getDetails();


  }


  getDetails(){

    this.http.userdata().subscribe(
      (res)=>{
      this.tenantDetails=res['results'];
      this.url = res['results'][0]['skillBharat']['url'];
      this.email = res['results'][0]['skillBharat']['emailId'];
      this.pass =  res['results'][0]['skillBharat']['password'];
      this.tenant = res['results'][0]['skillBharat']['tenant'];
        this.getCourse();
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    );






  }


  getCourse(){



    this.system_service.getIMSCourses().subscribe(
      data=>{
        if(data['results'].length>0) {
          this.system_service.getCourses().subscribe(
            res => {
              // this.ims_courses = data['results'];
              // this.courses = res['results'];
              let lms= data['results'];
              let course=res['results'];
              // console.log(lms);
              // console.log(course);
              let ctr=0;
              for(let i=0;i<lms.length;i++){
                for(let j=0;j<course.length;j++){
                  if(course[j].sbCourseId && lms[i].id==course[j].sbCourseId){
                    ctr=1;
                    break;
                  }
                }
                if(ctr==0){
                  this.ims_courses.push(lms[i]);
                }else{
                  ctr=0;
                }
              }

            },
            err => {
              this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
                timeOut: 2000
              });
            }
          )
        }else{
          this.toastr.info("Data is not available","SKILL BHARAT");
        }
      },
      err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )

  }

  suggest(){
    this.show = true;
  }

  suggest1(){
    this.show=false
  }

  update(){

    const message = `Are you sure you want to update?
                     You will be logged out to reflect changes.`;

  const dialogData = new ConfirmDialogModel("Update Details!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

    if(result){
    this.tenantDetails[0]['skillBharat']['url'] = this.url
    this.tenantDetails[0]['skillBharat']['emailId'] = this.email
    this.tenantDetails[0]['skillBharat']['password'] = this.pass
    this.tenantDetails[0]['skillBharat']['tenant'] = this.tenant

    this.system_service.updateTenant(this.tenantDetails[0]).subscribe(
      (res)=>{
        this.toastr.success('Details Updated Successfully', 'Success', {
          timeOut: 2000
        })
        localStorage.clear();
        this.router.navigate(['login']);
        this.system_service.nav=false
        this.system_service.show=false;

      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )
    }
  })

  }

  map() {
    if (this.selectedCourses.length > 0) {
      for (let i = 0; i < this.selectedCourses.length; i++) {
        let obj = {
          createdAt: this.selectedCourses[i].createdAt,
          description: this.selectedCourses[i].description,
          fee: this.selectedCourses[i].fee,
          image: this.selectedCourses[i].image,
          isFree: this.selectedCourses[i].isFree,
          name: this.selectedCourses[i].name,
          newTill: this.selectedCourses[i].newTill,
          parent: this.selectedCourses[i].parent,
          sbCourseId: this.selectedCourses[i].id,
          status: this.selectedCourses[i].status,
          tempImage: this.selectedCourses[i].tempImage,
          tenant: this.selectedCourses[i].tenant,
          updatedAt: this.selectedCourses[i].updatedAt,
        };


        this.system_service.mapCourses(obj).subscribe(
          res => {
            if (i! < this.selectedCourses.length) {
              this.courses = []
              this.ims_courses = []
              this.filtered_course = []
              this.selectedCourses = [];
              this.getCourse();
              this.toastr.success('Course Mapped Successfully', 'Success', {
                timeOut: 2000
              })
            }
          },
          err => {
            this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
              timeOut: 2000
            });
          }
        )
      }
    }else{
      this.toastr.warning("Select Course","MAP COURSE");
    }
  }







  selectCourse(val){
    let ctr=0;
    for(let i=0;i<this.selectedCourses.length;i++){
      if(this.selectedCourses[i].id==val.id){
        // console.log(1)
        ctr=1;
        break;
      }
    }

    if(ctr==0){
      this.selectedCourses.push(val);
      // this.courses.splice(val,1)
    }else{
      this.toastr.info("Course Already Selected","Course");
    }

  }

  removeCourse(val){
    let temp=[];
    for(let i=0;i<this.selectedCourses.length;i++){
      if(this.selectedCourses[i].id!=val.id){
        temp.push(this.selectedCourses[i]);
      }
    }
    this.selectedCourses=temp;
    // this.selectedCourses.splice(val,1)
    // this.courses.push(val)
  }
}
