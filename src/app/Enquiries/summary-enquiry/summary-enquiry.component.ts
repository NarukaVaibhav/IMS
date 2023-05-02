import { Component, OnInit } from '@angular/core';
import {EnquiryServiceService} from '../../services/enquiry-service.service'
import {Router} from "@angular/router";
import {Location} from '@angular/common'
import {MasterServiceService} from '../../services/master-service.service'
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-summary-enquiry',
  templateUrl: './summary-enquiry.component.html',
  styleUrls: ['./summary-enquiry.component.css']
})
export class SummaryEnquiryComponent implements OnInit {
  
  popup : boolean = false;
  
  arch : boolean = true;
  unarch : boolean = false;
  conv : boolean = true;
  addFoll : boolean = true;
  FollowUps=[];



questionExcel =[];



user_name;
followUp;
response;
comment;
  
  EnquiryDetails = []
  constructor(private enqService : EnquiryServiceService,
              private dialog: MatDialog,
             private router : Router,
             private location : Location,
             private master : MasterServiceService,
             private toastr: ToastrService,
             private modalService: NgbModal) { }

  ngOnInit() {
    
    if(this.enqService.EnqSummary.length==0){
      this.router.navigate(['Enquiry/view-enquiry'])
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });

    }
    else{
    this.summary();
    }
  }



  closeResult = '';
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

  

  summary(){

    if(this.enqService.EnqSummary[0]['status']=="Converted" ){
      this.conv= false;
      this.arch=false
      this.unarch=false;
      this.addFoll=false;
      }
      else{
        this.conv=true;
      this.arch=true
      this.unarch=true;
      this.addFoll=true;
      }

      if(typeof this.enqService.EnqSummary[0]['followUps'] === 'undefined'){
        this.enqService.EnqSummary[0]['followUps']=[];
      }

    this.EnquiryDetails = this.enqService.EnqSummary;
    
  }  

  back(){
    this.location.back();
    this.enqService.EnqSummary=[];
    this.EnquiryDetails=[]
    
  }


  addFollowUp(){
    this.followUp="";
    this.user_name = JSON.parse(localStorage.getItem('loginData'))['name']
    

    this.master.getFolllowUps().subscribe(res=>{
      for(let key in res['results']){
        this.FollowUps.push(res['results'][key]) 
      }
    },
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });

    }
    )


    this.popup=true;

    

  }




  submit(){

    if(this.user_name==""  || this.followUp=="" || this.response=="" || this.comment == ""){
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
        timeOut: 2000
      });

    }
    else{

    let obj={};

      obj ={
        "name" : this.user_name,
        "adminComment" : this.comment,
        "date" : new Date().toISOString(),
        "followMode" : this.followUp,
        "response" : this.response,
        "time":new Date().getHours()+':'+('0'+[new Date().getMinutes()]).slice(-2)

    }

    

    this.EnquiryDetails[0]['followUps'].push(obj)
    this.EnquiryDetails[0]['updatedAt'] = new Date().toISOString;


    this.enqService.addFollowUp(this.EnquiryDetails[0]).subscribe(res=>{
      this.toastr.success('Follow Up Added', 'Success', {
        timeOut: 2000
      });
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });

    }
      )

    this.modalService.dismissAll();
    this.followUp=""
    this.user_name=""
    this.response=""
    this.comment=""
    }
  }



  archive(){
    const message = `Are you sure you want to Archive?`;
 
    const dialogData = new ConfirmDialogModel("Archive Enquiry!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;

      if(result) {
  
        this.EnquiryDetails[0]['status']="Archived"

      this.enqService.statusArchived(this.EnquiryDetails[0]).subscribe(
        res=>{
          this.toastr.success('Enquiry Archived', 'Success', {
            timeOut: 2000
          });
        },err=>{
          this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
            timeOut: 2000
          });
    
        }
      )

      this.arch=false
      this.conv=false
      this.addFoll=false
      this.unarch=true;

      }
    })
  }

  unarchive(){
    const message = `Are you sure you want to Unarchive?`;
 
    const dialogData = new ConfirmDialogModel("Unarchive Enquiry!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;

    if(result) {
    this.EnquiryDetails[0]['status']="pending"

    this.enqService.statusUnarchived(this.EnquiryDetails[0]).subscribe(
      res=>{
        this.toastr.success('Enquiry Unarchived', 'Success', {
          timeOut: 2000
        });
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
  
      }
    )

    
    this.arch=true
    this.conv=true
    this.addFoll=true
    this.unarch=false
    }
  })
}


convert(){
  const message = `Are you sure you want to Convert it into Admission?`;
 
    const dialogData = new ConfirmDialogModel("Convert Enquiry!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;

  if(result) {
  
    this.EnquiryDetails[0]['status']="Converted"

    const req_payload={
      "basicDetails":{
                      "studentName":this.EnquiryDetails[0]['name'],
                      "emailID":this.EnquiryDetails[0]['emailId'],
                      "mobileNumber":this.EnquiryDetails[0]['contactNumber'],
                      "dateOfBirth":[],
                      "correspondingAddress":{
                                  "pinCode":[],
                                  "address":[]
                                    }
                      },
      "officeUseForm":{
                      "collegeName":this.EnquiryDetails[0]['collegeName'],
                      "dateOfRegistration":new Date().toISOString(),
                      "admissionType":"Converted"
                      },
      "educationDetails":[],
      "receipt":{
                "defaultGSTTax":18,
                "appliedFees":{},
                "totalPayableFee":0,
                "paymentSelection":"Full Payment",
                "allInstallments":[{}]
                },
      "admissionType":"Converted",
      "status":"Inactive",
      "accountStatus":"Inactive",
      "submission":"new"
    }
  
  this.enqService.statusConverted(this.EnquiryDetails[0]).subscribe(res=>{
    this.toastr.success('Enquiry Converted', 'Success', {
      timeOut: 2000
    });
  },err=>{
    this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
      timeOut: 2000
    });

  })
  this.enqService.createAdmission(req_payload).subscribe(res=>
    {
      this.toastr.success('Converted', 'Success', {
        timeOut: 2000
      });
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });

    })
  this.EnquiryDetails.pop();
  this.router.navigate(['Enquiry/view-enquiry']);
  
  }
})
  
}


cancel(){
  this.modalService.dismissAll();
  this.FollowUps=[];
  this.comment=""
  this.response=""
  this.followUp=""
  
}

}
