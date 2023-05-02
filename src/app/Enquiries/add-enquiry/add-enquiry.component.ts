import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {EnquiryServiceService} from '../../services/enquiry-service.service'
import { Location, DatePipe } from '@angular/common';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



import * as XLSX from 'xlsx';

type AOA = any[][];



@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {

Enquiry : FormGroup
courses = [];
EnquiryDetails=[];
addEnq : boolean = true;
enqDetail : boolean = false;
popup : boolean = false;
table : boolean = false;
arch : boolean = false;
unarch : boolean = false;
conv : boolean = false;
addFoll : boolean = false;
UploadExcelBtn;


FollowUps=[];

data: AOA = [];

questionExcel =[];



user_name;
followUp;
response;
comment;

  constructor(private formbuilder : FormBuilder,
              private service : EnquiryServiceService,
              private location : Location,
              private datePipe : DatePipe,
              private router: Router,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {

    this.Enquiry = this.formbuilder.group({
     
      name : new FormControl('', Validators.required),
      qualification : new FormControl('', Validators.required),
      enquiredFor : new FormControl('', Validators.required),
      reference  : new FormControl(),
      description : new FormControl(),
      contact : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)]),
      email : new FormControl('',[Validators.email, Validators.required,Validators.pattern(/[^@]+@[^\.]+\..+/)]),
      colg : new FormControl(),
      date : new FormControl('',Validators.required)
  
    })

    //code for getting course list

    this.service.getCourses().subscribe((res)=>{
      
      for(let key in res['results']){
        this.courses.push(res['results'][key])
      }

    },
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })

    this.EnquiryDetails=[];
    

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


    back(){
      this.location.back();
  
    }
    
    clear(){
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
    
    addEnquiry(){
      
      if(this.Enquiry.invalid){
        this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
              timeOut: 2000
            });
            
            return;
      }
  


      
      let date= new  Date(this.Enquiry.controls['date'].value).getDate()
      let month = new Date(this.Enquiry.controls['date'].value).getMonth() + 1
      let year = new Date(this.Enquiry.controls['date'].value).getFullYear()


      if(isNaN(date) || isNaN(month) || isNaN(year)){
        this.toastr.error('Enter Correct Date', 'Incorrect Date', {
          timeOut: 2000
        });
        return;
    
       }
       
   if(year > new Date().getFullYear()){

    this.toastr.error('Enter correct date', 'Incorrect Date', {
      timeOut: 2000
    });

    return;
    }

    else if(year == new Date().getFullYear()){

    if(date > new Date().getDate()){
      if(month >= (new Date().getMonth()+1)){

        this.toastr.error('Enter correct date', 'Incorrect Date', {
          timeOut: 2000
        });
    
      return;
      }
    }
  }



    if(this.Enquiry.invalid){
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
            timeOut: 2000
          });
          
          return;
    }


    else{

      const req_payload={

      'followUps': [],
      'name': this.Enquiry.controls['name'].value,
      'qualification': this.Enquiry.controls['qualification'].value,
      'contactNumber': this.Enquiry.controls['contact'].value,
      'emailId': this.Enquiry.controls['email'].value,
      'enquiredFor': this.Enquiry.controls['enquiredFor'].value,
      'referenceName': this.Enquiry.controls['reference'].value,
      'collegeName': this.Enquiry.controls['colg'].value,
      'enquirydate': new Date(this.Enquiry.controls['date'].value).toISOString() ,
      'description': this.Enquiry.controls['description'].value,
      'enquiryMode': "Direct",
      'status': "Pending",
      'enquireddate': this.datePipe.transform(this.Enquiry.controls['date'].value, "dd/mm/yyy")


      }

      this.service.createEnquiry(req_payload).subscribe(
        (res)=> {

            this.service.EnqSummary.push(res)
          

          this.toastr.success('Enquiry Added Successfully', 'Success', {
            timeOut: 2000
          });
          
      this.router.navigate(['Enquiry/enquiry-summary'])
          
              },
              err=>{
                this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
                  timeOut: 2000
                });
              }
              
          
      )

      
      
      
      this.clear();



    }
      
    }





back_to_form(){
  this.addEnq=true;
  this.enqDetail=false;
  this.table=false;
}




  onFileChange(evt: any) {
    /* wire up file reader */
   
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let id=1;
      for(let i=1;i<this.data.length;i++)
      { this.questionExcel.push({
            'id' : id++,
            'Name': this.data[i][0] ,
            'Email' : this.data[i][1],
            'EnquiryFor':this.data[i][2] ,
            'EnquiryDate' :this.data[i][3] ,
            'Mobile' : this.data[i][4],
            'Qualification' : this.data[i][5],
            'CollegeName' : this.data[i][6],
            'ReferenceName' : this.data[i][7],
            'Description' :this.data[i][8],
            'UploadStatus' : "Pending"
            
          })
      }
      console.log("001",this.questionExcel)
     
}
reader.readAsBinaryString(target.files[0])

  }

  close_dialog(){
    this.modalService.dismissAll();
    this.questionExcel=[]
    this.data=[];
    this.UploadExcelBtn=""
  }

  addexcel(){
    console.log(this.questionExcel)
    for(let i=0;i<this.questionExcel.length;i++){
 
    const req_payload={

      'followUps': [],
      'name': this.questionExcel[i]['Name'],
      'qualification': this.questionExcel[i]['Qualification'],
      'contactNumber': this.questionExcel[i]['Mobile'],
      'emailId': this.questionExcel[i]['Email'],
      'enquiredFor': this.questionExcel[i]['EnquiryFor'],
      'referenceName': this.questionExcel[i]['ReferenceName'],
      'collegeName': this.questionExcel[i]['CollegeName'],
      'enquirydate': new Date(this.datePipe.transform(this.questionExcel[i]['EnquiryDate'], "yyyy-MM-dd")).toISOString() ,
      'description': this.questionExcel[i]['Description'],
      'enquiryMode': "Direct",
      'status': "Pending",
      'enquireddate': this.datePipe.transform(this.questionExcel[i]['EnquiryDate'], "dd/mm/yyyy")
      }

      this.service.createEnquiry(req_payload).subscribe(
        (res)=> {

          this.toastr.success('Enquiry Added Successfully', 'Success', {
            timeOut: 2000
          });
          this.router.navigate(['Enquiry/view-enquiry'])

          // this.questionExcel[i]['UploadStatus']="Success"

              },
              err=>{
                this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
                  timeOut: 2000
                });

              }
      
      )
            }
            this.modalService.dismissAll();
      
      this.clear();

      this.addEnq= true;
        this.enqDetail= true;
        this.table=true;
        this.unarch=false;
        this.arch=true
        this.conv=true
        this.addFoll=true
        this.questionExcel=[]
  }



  sameDownload()
  {
    let arr=[
      {
        
        Name :'',
        Email:'',
        EnquiryFor : '',
        EnquiryDate : '',
        Mobile : '',
        Qualification : '',
        CollegeName : '',
        ReferenceName : '',
        Description : '',

      }
    ]
// array of objects to save in Excel
let binary_univers = arr

let binaryWS = XLSX.utils.json_to_sheet(binary_univers); 

// Create a new Workbook
var wb = XLSX.utils.book_new() 

// Name your sheet
XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values') 

// export your excel
XLSX.writeFile(wb, 'Sample_Enquiry_Format.xlsx');
  }



}
