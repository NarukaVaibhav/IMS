import { Component, OnInit } from '@angular/core';
import { PlacementdataService } from '../../services/placementdata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

 
  companyname;
  website;
  contactno;
  emailid;
  address;
  selectioncriteria;
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
  companyinfo={};
  d=new Date();
  datesend=this.d.getDate()+"-"+this.d.getMonth()+"-"+this.d.getFullYear();
  tenant=localStorage.getItem('tenant')

  constructor(public service:PlacementdataService,private route:Router,private toastr:ToastrService) { }

  ngOnInit() {
  }

senddata(){

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
      const endate= new Date()

  
      const endate1 = (endate.getFullYear() + "-" + (endate.getMonth()+1) + "-" + endate.getDate()+"T"+endate.getHours()+":"+endate.getMinutes()+":"+endate.getSeconds()+":"+endate.getMilliseconds()+"Z")
    
    const companyinfo={
      name: this.companyname,
    contactNumber: this.contactno,
    website: this.website,
    emailId: this.emailid,
    address: this.address,
    selectionCriteria: this.selectioncriteria,
    selectionProcedure: this.selectionprocedure,
    Technologies: this.technologies,
    totalStudentRequired: this.noofstudent,
    placeOfPosting: this.placeofposting,
    noOfVacancies: this.vacancies,
    bondDuration: this.bond,
    probationPeriod: this.probationperiod,
    appraisalPeriod: this.appraisalperiod,
    joiningDate: this.joiningdate,
    other: this.others,
    status: "Active"
    }
    this.service.addcompany(companyinfo).subscribe(res=>{
      this.toastr.success('Company Add Successfully', 'Comany Added', {
        timeOut: 2000
      });
      this.route.navigate(['/Placement/viewplacement'])
      }, err=> {
        this.toastr.error(' Error Company Add Successfully', 'Error in Comany Added', {
          timeOut: 2000
        });
      })

    }
    else
   {
     this.toastr.error('Mobile Must be 10 Digit', 'inValid', {
       timeOut: 2000
     });
     
   }
  
    }
}

goback(){
this.route.navigate(['/dashboard'])
}
}
