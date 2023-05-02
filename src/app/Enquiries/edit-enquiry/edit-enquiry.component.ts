import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators, FormBuilder} from '@angular/forms';
import {EnquiryServiceService} from '../../services/enquiry-service.service'
import { Location, DatePipe } from '@angular/common';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-enquiry',
  templateUrl: './edit-enquiry.component.html',
  styleUrls: ['./edit-enquiry.component.css']
})
export class EditEnquiryComponent implements OnInit {

  Enquiry : FormGroup;

  courses=[];
  constructor(private enqService : EnquiryServiceService,
    private formbuilder : FormBuilder,
    private window : Location,
    private datePipe : DatePipe,
    private router : Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    if(this.enqService.EnquiryDetails.length==0){
      this.router.navigate(['Enquiry/view-enquiry'])
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    this.Enquiry = this.formbuilder.group({
     
      name : new FormControl('', Validators.required),
      qualification : new FormControl('', Validators.required),
      enquiredFor : new FormControl('', Validators.required),
      reference  : new FormControl(),
      description : new FormControl(),
      contact : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)]),
      email : new FormControl('',[Validators.email, Validators.required,Validators.pattern(/[^@]+@[^\.]+\..+/)]),
      colg : new FormControl(),
      date : new FormControl('',Validators.required),
  
    })

    //code for getting course list

  this.enqService.getCourses().subscribe((res)=>{
    
    for(let key in res['results']){
      this.courses.push(res['results'][key])
    }

  },
  err=>{
    this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
      timeOut: 2000
    });

  })

    
    this.editEnquiry();
  }


  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


  editEnquiry(){
    
      let row ={}
       row=this.enqService.EnquiryDetails[0];

        if(!this.isEmpty(row)){
      
         if(typeof this.enqService.EnquiryDetails[0]['referenceName'] === "undefined"){
          row["referenceName"]=" "
        }
        if(typeof this.enqService.EnquiryDetails[0]['description'] === "undefined"){
          row["description"]=" "
        }
        if(typeof this.enqService.EnquiryDetails[0]['collegeName'] === "undefined"){
          row["collegeName"]=" "
        }
       
      
      
      let date=this.datePipe.transform(row['enquirydate'], 'yyyy-MM-dd');
      
      
      
        this.Enquiry.setValue({
          name : row['name'],
          enquiredFor : row['enquiredFor'],
          qualification : row['qualification'],
          reference  : row['referenceName'],
          description : row['description'],
          contact : row['contactNumber'],
          email : row['emailId'],
          colg : row['collegeName'],
          date : date
      
        })

    

      }
  

  
  }

  cancel(){
    this.window.back();
    
    
    this.enqService.EnquiryDetails=[];
    this.Enquiry.reset();
        this.Enquiry.setValue({
          name : '',
          enquiredFor : 0,
          qualification : '',
          reference  : '',
          description : '',
          contact : '',
          email : '',
          colg : '',
          date : '',
    
        })
  }
  

  updateEnquiry(){
    
    if(this.Enquiry.invalid){
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }

    let date= new  Date(this.Enquiry.controls['date'].value).getDate()
   let month = new Date(this.Enquiry.controls['date'].value).getMonth() + 1
   let year = new Date(this.Enquiry.controls['date'].value).getFullYear()

   let enquired = date + "/" + month + "/" + year
   let enquiry = date + "-" + month + "-" + year
  
   if(isNaN(date) || isNaN(month) || isNaN(year)){
    this.toastr.error('Enter Correct Date', 'Incorrect Date', {
      timeOut: 2000
    });
    return;

   }
   if(year > new Date().getFullYear()){
    this.toastr.error('Enter Correct Date', 'Incorrect Date', {
      timeOut: 2000
    });
    return;
    }
    else if(year == new Date().getFullYear()){
    if(date > new Date().getDate()){
      if(month >= (new Date().getMonth()+1)){
        this.toastr.error('Enter Correct Date', 'Incorrect Date', {
          timeOut: 2000
        });
      return;
      }
    }
  }

  
    if(this.Enquiry.invalid){
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
    else{
    this.enqService.EnquiryDetails[0]['name'] = this.Enquiry.controls['name'].value
    
    this.enqService.EnquiryDetails[0]['qualification']= this.Enquiry.controls['qualification'].value
    this.enqService.EnquiryDetails[0]['contactNumber']= this.Enquiry.controls['contact'].value
    this.enqService.EnquiryDetails[0]['emailId']= this.Enquiry.controls['email'].value
    this.enqService.EnquiryDetails[0]['enquiredFor']= this.Enquiry.controls['enquiredFor'].value
    this.enqService.EnquiryDetails[0]['referenceName']= this.Enquiry.controls['reference'].value
    this.enqService.EnquiryDetails[0]['collegeName']= this.Enquiry.controls['colg'].value
    this.enqService.EnquiryDetails[0]['enquirydate']= new Date(this.Enquiry.controls['date'].value).toISOString() 
    this.enqService.EnquiryDetails[0]['description']= this.Enquiry.controls['description'].value
    this.enqService.EnquiryDetails[0]['status']= "Pending"
    this.enqService.EnquiryDetails[0]['enquireddate']= enquired
    this.enqService.EnquiryDetails[0]['updatedAt']= new Date().toISOString()
  
    delete this.enqService.EnquiryDetails['row_status']
  
    this.enqService.updateEnq(this.enqService.EnquiryDetails[0]).subscribe(
      res=>{
        this.toastr.success('Enquiry Updated Successfully', 'Success', {
          timeOut: 2000
        })
        this.router.navigate(['Enquiry/view-enquiry']); 
        this.Enquiry.setValue({
          name : '',
          enquiredFor : "",
          qualification : '',
          reference  : '',
          description : '',
          contact : '',
          email : '',
          colg : '',
          date : '',
      
        })
    },
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });

    }
    
    )
  
    
    this.enqService.EnquiryDetails=[];
    }
  }
  

}
