import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,ParamMap } from '@angular/router';
import {PlacementdataService} from '../../services/placementdata.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-placementedit',
  templateUrl: './placementedit.component.html',
  styleUrls: ['./placementedit.component.css']
})
export class PlacementeditComponent implements OnInit {


  companyname;
  contactno;
  website;
  emailid;
  address;
  selectionCriteria;
  technologies;
  selectionprocedure;
  noofstudent;
  placeofposting;
  bond;
  vacancies;
  salaryperannum;
  probationperiod;
  joiningdate;
  appraisalperiod;
  dateforofferletter;
  others;

  constructor(private service: PlacementdataService,
    private rout : Router,
    private route : ActivatedRoute,
    private toastr:ToastrService) { }

    id
    arr=[];
    placeholder
    editDatas
    ngOnInit() {
  
      this.route.paramMap.subscribe((params : ParamMap)=>{
        this.id= params.get('id')
      
      this.service.edit(this.id).subscribe(res=>{
        this.editDatas=res["results"][0]
        console.log(this.editDatas);

        this.arr=res["results"];

        this.companyname=this.editDatas.name;
      this.contactno=this.editDatas.contactNumber;
      this.website=this.editDatas.website;
      this.emailid=this.editDatas.emailId;
      this.address=this.editDatas.address;
      this.selectionCriteria=this.editDatas.selectionCriteria;
      this.technologies=this.editDatas.Technologies;
      this.selectionprocedure=this.editDatas.selectionProcedure;
      this.noofstudent=this.editDatas.totalStudentRequired;
      this.placeofposting=this.editDatas.placeOfPosting;
      this.bond=this.editDatas.bondDuration;
      this.vacancies=this.editDatas.noOfVacancies;
      // salaryperannum=this.editDatas.;
      this.probationperiod=this.editDatas.probationPeriod;
      this.joiningdate=this.editDatas.joiningDate;
      this.appraisalperiod=this.editDatas.appraisalPeriod;
      // dateforofferletter;
      this.others=this.editDatas.other;
      })
    
      
    });
    
  }

  updatedata(){

    var emailValid =new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  
  var re = new RegExp('[0-9]{10}')
 

    if(this.companyname == undefined || this.companyname == '' || this.website == undefined || this.website =='' || this.contactno == undefined || this.contactno == '' || this.emailid == undefined || this.emailid == '' ||this.address == undefined || this.address == '' || this.noofstudent == undefined || this.noofstudent == '')
    {
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      
    }
    else if(!(emailValid.test(this.emailid)))
    {
      
      this.toastr.error('Email Format Not Valid', 'Emal Field', {
        timeOut: 2000
      });
    }
    else if(!(re.test(this.contactno)))
    {
      console.log(this.contactno)
      this.toastr.error('Mobile Number Field', 'Mobile Number 10 Digit', {
        timeOut: 2000
      });
    }

    else
    {
      if(this.contactno.toString().length==10)
    {

    const date=new Date();
    this.arr[0]['name']=this.companyname;
    this.arr[0]['contactNumber']=this.contactno;
    this.arr[0]['website']=this.website;
    this.arr[0]['emailId']=this.emailid;
    this.arr[0]['address']=this.address;
    this.arr[0]['selectionCriteria']=this.selectionCriteria;
    this.arr[0]['Technologies']=this.technologies;
    this.arr[0]['selectionProcedure']=this.selectionprocedure;
    this.arr[0]['totalStudentRequired']=this.noofstudent;
    this.arr[0]['placeOfPosting']=this.placeofposting;
    this.arr[0]['bondDuration']=this.bond;
    this.arr[0]['noOfVacancies']=this.vacancies;
    // this.arr[0]['selectionProcedure']=this.salaryperannum
    this.arr[0]['probationPeriod']=this.probationperiod;
    this.arr[0]['joiningDate']=this.joiningdate;
    this.arr[0]['appraisalPeriod']=this.appraisalperiod;
    // this.arr[0]['selectionProcedure']=this.dateforofferletter
    this.arr[0]['other']=this.others;
    this.arr[0]['updatedAt']=date.toISOString();
    console.log(this.arr[0]);

  
 

    this.service.updatecompany(this.arr[0]).subscribe(res=>{
      this.toastr.success('Company Add Successfully', 'Comany Added', {
        timeOut: 2000
      });
      this.rout.navigate(['/Placement/viewplacement'])

      , console.log(res)}, err=> {
        this.toastr.error(' Error Company Add Successfully', 'Error in Comany Added', {
        timeOut: 2000
      });})

    
  }
  else
 {
   this.toastr.error('Mobile Must be 10 Digit', 'inValid', {
     timeOut: 2000
   });
   
 }
}

    

    }

back(){
        this.rout.navigate(['/Placement/viewplacement'])
      }

}
