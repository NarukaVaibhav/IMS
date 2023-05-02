import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { HttpService} from '../../services/http.service';
import { SystemService } from '../../services/system.service';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-systen-tenant-config',
  templateUrl: './systen-tenant-config.component.html',
  styleUrls: ['./systen-tenant-config.component.css']
})
export class SystenTenantConfigComponent implements OnInit {

 
    

    imageError: string;
    isImageSaved: boolean = false;
    cardImageBase64: string;

    addr
    email
    contact
    recpt


    userData = []

    
  constructor(private http : HttpService,
              private system_service : SystemService,
              private router : Router,
              private toastr: ToastrService,
              private dialog : MatDialog) { }

  ngOnInit() {

    this.getTenantData();
  }



  getTenantData(){

    this.http.userdata().subscribe(
      res=>{

        this.userData=res['results']

        this.addr=res['results'][0]['address']
        this.email=res['results'][0]['skillBharat']['emailId']
        this.contact = res['results'][0]['contactNumber']
        this.recpt =  res['results'][0]['receiptNumber']

        if(typeof res['results'][0]['image'] === "undefined" )
        { 
          this.isImageSaved= false
          this.cardImageBase64=null;
        }
        else if(res['results'][0]['image'].length == 0){
          this.isImageSaved= false
          this.cardImageBase64=null;
          }
          else{
            
            this.isImageSaved=true;

            this.cardImageBase64 = res['results'][0]['image'][0]['dataURL']
            this.imageError=null;
          }
        
        
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )

  }




  
fileChangeEvent(fileInput: any) {
  this.imageError = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';

          return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];



              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

removeImage() {
  const message = `Are you sure you want to remove?`;
 
  const dialogData = new ConfirmDialogModel("Remove User Profile!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   let result = dialogResult;
  
  if(result){
  this.cardImageBase64 = null;
  this.isImageSaved = false;
  }
})
}





update(){

  let img = []

  const message = `Are you sure you want to update?
                   You will be logged out to reflect changes.`;
 
  const dialogData = new ConfirmDialogModel("Update Tenant Details!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
   let result = dialogResult;
  
  if(result){
  this.userData[0]['address'] = this.addr
  this.userData[0]['skillBharat']['emailId'] = this.email
  this.userData[0]['contactNumber'] = this.contact
  this.userData[0]['receiptNumber'] = this.recpt
   
  if(this.isImageSaved == true && this.cardImageBase64 != null){
    img[0]= {
      "file" : {},
      "url" : "blob:http://52.231.10.96:9000/33ac0ff2-766e-4172-814a-0ced76144149",
      "resized" : {
                    "dataURL": this.cardImageBase64,
                    "type" : "image/png",
                  },
    "dataURL": this.cardImageBase64
        

    }

    this.userData[0]['image'] = img
  }

  else{

    this.cardImageBase64=null;
    
    this.isImageSaved=false;
    
    if(typeof this.userData[0]['image'] !== 'undefined'){
      delete this.userData[0]['image'];
    }

  }
  this.system_service.updateTenant(this.userData[0]).subscribe(
    (res)=>{
      localStorage.clear();
      this.router.navigate(['login']);
      this.system_service.nav=false
        this.system_service.show=false;
      this.toastr.success('Details Updated Successfully', 'Success', {
        timeOut: 2000
      })
    },
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
  )

  }
})
}


}
