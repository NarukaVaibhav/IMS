import { Component, OnInit } from '@angular/core';
import { HttpService} from '../services/http.service';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../Toast/toaster.service';
import { ExamService } from '../services/exam.service';
import { UrlService } from '../services/url.service';
import {RoleDATAService} from '../role-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private toastr: ToastrService,
              private toastCustom: ToasterService,
              private formBuilder: FormBuilder,
              public httpserv: HttpService,
              public batchTenant : ExamService,
              private router : Router,private url:UrlService,
  public role:RoleDATAService){}



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  
  
  
  }


  showSuccess(secondaryMsg) {
    this.toastr.success(secondaryMsg, 'Login Successful',{
      timeOut: 2000
    });
  }
  showError() {
    this.toastr.error('Invalid Credentials', 'Login Error', {
      timeOut: 3000
    });
  }
  emailval = /\w+\@\w+\.\w+/;
  generateLogin(){
    if(!this.emailval.test(this.loginForm.controls['email'].value)){
      this.toastr.error("Enter Valid Email","Login");

    }else if(!this.loginForm.controls['password'].value){
      this.toastr.error("Enter Password","Login");

    }else{
      this.httpserv.Loginpost({email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value}).subscribe(data=>{
        // console.log(data)

          try{


            localStorage.setItem("token", data.token);
            localStorage.setItem("loginData", JSON.stringify(data['results']));
            localStorage.setItem("tenant", data['results']['tenant']);
            if(data['results'].designation!="Default Admin" && data['results'].designation!="Admin" && data['results'].designation != "ADMIN" && data['results'].designation!='Teacher'){
              this.url.getRoles().subscribe((res:any)=> {
                //console.log(res);
                if(res['results'] && res['results'].length>0){
                  let availableroles:any=res['results'];
                  this.role.sidemenuRolemanage(availableroles[0].roles);
                }
              }, (err)=> {
                console.log(err);
              })
            }else{
              this.router.navigate(['/dashboard']);
            }
            // console.log(this.url.url)
            // this.url.url=this.url.urlWithoutTenant+data['results']['tenant'];
          // console.log(this.url.url)
            }catch{
            this.toastCustom.errorstatus0();
            localStorage.clear();
            return;
          }

          // .then(() => {
          //   window.location.reload();
          // });



    },
    err=>{
      if(err.status==0){
          this.toastr.error("Check your internet Connetion","Connectivity Issue", {
            timeOut: 3000
          });
      }
      else if(err.status==401){
        this.showError();
      }

    // this.router.navigate(['/login']);
    console.log(err);
    });

    // this.httpserv.userdata().subscribe(
    //   res => localStorage.setItem("userTenant", JSON.stringify(res['results']))
    // )
  }
}

}
