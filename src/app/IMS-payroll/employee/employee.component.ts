import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import{PayrollService} from '../payroll.service';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import{ToasterService} from '../../Toast/toaster.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild('infile',{static:true}) infile: ElementRef;
  allemp:any=[];
  empColumns:any=["name","designation","contactNumber","emailId","status","action"];
  selectedEmployee:any;
  editEMP="block";
  showedit=false;
  headerTxt="All Employees";

 tempallEMP:any=[];



  constructor(public service:PayrollService,public toast:ToasterService,public router:Router) {
    this.router.navigate(['/Payroll/Employee/','All_Emp']);
    this.service.getallEmployee().subscribe((res)=>{
      // console.log(res);
      let data:any=res;
      this.tempallEMP=data;
      this.editEMP="block";
      this.allemp=new MatTableDataSource(data);
      // this.allemp=res;
      this.allemp.paginator=this.paginator;
      this.allemp.sort=this.sort;
    },(err)=>{
      this.toast.errorstatus0();
      // console.log(err);
    })
  }
  searchemp:any='';
  searchEmployee(){
    // console.log(this.tempallEMP) ;
    let temp:any=[];
  this.allemp=[];
      temp=this.tempallEMP.filter((data)=>data.name.toLowerCase().indexOf(this.searchemp.toLowerCase()) > -1);
      // console.log(temp);
    this.allemp=new MatTableDataSource(temp);
    // this.allemp=res;
    this.allemp.paginator=this.paginator;
    this.allemp.sort=this.sort;
  }


  ngOnInit() {
  }

  reset(){
    this.headerTxt="All Employees";
    this.editEMP="block";
    this.showedit=false;
    this.docarr=[];
    this.router.navigate(['/Payroll/Employee/','All_Emp']);
    this.resetOBJ();

  }

  reset1(){
    this.salary=false;
    this.netsalary=false;
    this.bankinfo=false;
    this.profileedit=false;
    this.currentposedit=false;
    this.personinfoedit=false;
    this.sedit=false;
    this.docedit=false;
  }

  setup(){

      this.profileedit=true;
      this.currentposedit=true;
      this.personinfoedit=true;
      this.sedit=true;
      this.docedit=true;

  }
  empobj={"profile":{
                "name":"",
                "empid":"" },
  "position":{
    "designation":"",
    "department":"",
    "reporting":"",
    "doj":"",
    "location":"",
    "notice_period":"",
    "employment_type":""},
  "personalInfo":{
    "father_name":"",
    "spouse":"",
    "dob":"",
    "blood_group":""},
  "salary":{
    "gross_salary":{
      "basic_salary":"",
      "hra":"",
      "conveyance":"",
      "medical_allowance":"",
      "bonus":""},
    "net_salary":{
      "pf":"",
      "loan":"",
      "salary_advance":"",
      "it/tds":"",
      "insurance":"",
      "other":""},
      "bank_info":{
        "pan_no":"",
        "PF_no":"",
        "account_name":"",
        "account_number":"",
        "ifsc_code":"",
        "bank_name":""
      }
  } };

  salary=false;
  netsalary=false;
  bankinfo=false;

  update=true;
  profileedit=false;
  currentposedit=false;
  personinfoedit=false;
  sedit=false;
  docedit=false;


  edi(syntax){
    switch(syntax){
      case 'e':this.profileedit=true;break;
      case 'c':this.currentposedit=true;break;
      case 'p':this.personinfoedit=true;break;
      case 's':this.sedit=true;break;
      case 'd':this.docedit=true;this.docarr=[];
        alert("If you Update your Document Your Previous Document will be deleted...");
        break;
      default : console.log("do nothing");
    }
  }
  cancel(syntax){
    switch(syntax){
      case 'e':this.profileedit=false;break;
      case 'c':this.currentposedit=false;break;
      case 'p':this.personinfoedit=false;break;
      case 's':this.sedit=false;break;
      case 'd':this.docedit=false;this.docarr=this.tempdoc;break;
      default : console.log("do nothing");
    }
  }

  editProfile(data){
    console.log(data);
    this.empobj.profile.name=data.name;
    this.service.fetchempDetail(data.name).subscribe((res)=>{
      // console.log(res);
      if(res['is_add']==0){
      this.selectedEmployee=data;
    this.headerTxt="Add Employee Detail";
    this.editEMP="none";
    this.showedit=true;
    this.update=false;
    this.setup();
      }else if(res['is_add']==1){
        this.selectedEmployee=data;
        this.headerTxt="Update Employee Detail";
        this.editEMP="none";
        this.showedit=true;
        this.update=true;
        // console.log(res['response'][0].data.docs);
        if(res['response'][0].data.docs){
          this.docdataAdd(res['response'][0].data.docs);
        this.empobj=res['response'][0].data;
        // let keys=Object.keys(res['response'][0].data.docs);
        // // console.log(keys[0]);
        // for(let i=0;i<keys.length;i++){
        //   // console.log(res['response'][0].data.docs[keys[i]]);
        //   this.docarr.push({"files":res['response'][0].data.docs[keys[i]],"name":keys[i]});
        //   this.tempdoc.push({"files":res['response'][0].data.docs[keys[i]],"name":keys[i]});
        // }
      }
        // console.log(this.docarr);

        this.reset1();
      }else{
        this.toast.errorstatus0();
        // alert("Something went Worng");
      }
    },(err)=>{
      this.toast.errorstatus0();
      // console.log(err);
    })



  }


  docdataAdd(data){
    console.log(data)
    this.docarr=[];
    this.tempdoc=[];
        let keys=Object.keys(data);
        // console.log(keys[0]);
        for(let i=0;i<keys.length;i++){
          // console.log(res['response'][0].data.docs[keys[i]]);
          this.docarr.push({"files":data[keys[i]],"name":keys[i]});
          this.tempdoc.push({"files":data[keys[i]],"name":keys[i]});
        }
  }

resetOBJ(){
  this.empobj={"profile":{
    "name":"",
    "empid":"" },
"position":{
"designation":"",
"department":"",
"reporting":"",
"doj":"",
"location":"",
"notice_period":"",
"employment_type":""},
"personalInfo":{
"father_name":"",
"spouse":"",
"dob":"",
"blood_group":""},
"salary":{
"gross_salary":{
"basic_salary":"",
"hra":"",
"conveyance":"",
"medical_allowance":"",
"bonus":""},
"net_salary":{
"pf":"",
"loan":"",
"salary_advance":"",
"it/tds":"",
"insurance":"",
"other":""},
"bank_info":{
  "pan_no":"",
  "PF_no":"",
  "account_name":"",
  "account_number":"",
  "ifsc_code":"",
  "bank_name":""
}
}
};
}
cs(){
  if(this.salary){
    this.netsalary=false;
    this.bankinfo=false;
  }

}

ns(){
if(this.netsalary){
  this.salary=false;
  this.bankinfo=false;
}
}

bs(){
  if(this.bankinfo){
    this.salary=false;
    this.netsalary=false;
  }
}

documentname;
docarr:any=[];
fileresult;
public onFileChange(event) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    this.documentname = event.target.files[0].name;
    const [file] = event.target.files;
    console.log(event.target.files[0])
   this.fileresult=event.target.files[0];
    // reader.readAsDataURL(file);

    // reader.onload = () => {

    //     this.fileresult= reader.result;
    //     console.log(this.fileresult);
    // };
  }
  // console.log(this.infile);
  // console.log(this.documentname);

}
tempdoc:any=[];

AddDoc(){
  // console.log(this.documentname);
  if(!this.documentname||this.documentname.length==0){
    // alert("Choose Document")
    this.toast.warningcustomhead("Choose Document","Document!");
  }
  else if(this.docarr.length<4){
    this.docarr.push({"files":this.fileresult,"name":this.documentname});
    this.fileresult="";
    this.documentname="";


  }else{
    this.toast.warningcustomhead("Cannot add more than 4 document","Document!");
    // alert("Cannot add more than 4 document");
  }
  // console.log(this.docarr)
  // var formdata=new FormData();
  // formdata.append("name",this.selectedEmployee.name);
  // formdata.append("files",this.fileresult);
  // this.finalupdate(formdata);

}



  AddEmploye(){
    // this.empobj.salary.net_salary["it/tds"]=""
    if(this.checkValidationADDTIME()){
    // console.log(this.empobj);
    var formdata=new FormData();
    let addprocess=new Promise((resolve,reject)=>{
      formdata.append("data",JSON.stringify(this.empobj));
      for(let i=0;i<this.docarr.length;i++){
        formdata.append("files",this.docarr[i].files);
      }

      resolve();
    });
    addprocess.then(()=>{
      this.service.addEmployeeSaldata(formdata).subscribe((res)=>{
        // this.resetOBJ();
        if(res['status']==403){
          this.toast.warningcustomhead(res['msg'],"Employee");
        }else{
			this.reset();
          this.toast.successcustomhead(res['msg'],"Employee");
        }

          // console.log(res);
        },(err)=>{
          this.toast.errorstatus0();
          // console.log(err);
        });
    })
  }
  }


  checkValidationADDTIME(){
    if(!this.profileValidate()){
      return false;
    }else if(!this.personalInfoValidate()){
      return false;
    }else if(!this.positionValidate()){
      return false;
    }else if(!this.salaryValidate()){
      return false;
    }else if(!this.docValidate()){
      return false;
    }
    else{
      return true;
    }
  }

  profileValidate(){
    let empidTest=/[0-9a-zA-Z]/;
    if(!empidTest.test(this.empobj.profile.empid)){
      this.toast.warningcustomheadAndTimeout("Employee Id is Required","Profile",3000);
      return false;
    }else{
      return true;
    }
  }
  positionValidate(){
    let stringTest=/[a-zA-Z]/;
    let empidTest=/[0-9a-zA-Z]/;
    if(!stringTest.test(this.empobj.position.designation)){
      this.toast.warningcustomheadAndTimeout("Designation is Required","Position",3000);
      return false;
    }else if(!stringTest.test(this.empobj.position.department)){
      this.toast.warningcustomheadAndTimeout("Department is Required","Position",3000);
      return false;
    }else if(!stringTest.test(this.empobj.position.reporting)){
      this.toast.warningcustomheadAndTimeout("'Reporting To' is Required","Position",3000);
      return false;
    }else if(!empidTest.test(this.empobj.position.doj)){
      this.toast.warningcustomheadAndTimeout("Date of joining is Required","Position",3000);
      return false;
    }else if(!stringTest.test(this.empobj.position.location)){
      this.toast.warningcustomheadAndTimeout("Location is Required","Position",3000);
      return false;
    }else if(!empidTest.test(this.empobj.position.notice_period)){
      this.toast.warningcustomheadAndTimeout("Notice Period is Required","Position",3000);
      return false;
    }else if(!stringTest.test(this.empobj.position.employment_type)){
      this.toast.warningcustomheadAndTimeout("Employee Type is Required","Position",3000);
      return false;
    }else{
      return true;
    }
  }

  personalInfoValidate(){
    let stringTest=/[a-zA-Z]/;
    let empidTest=/[0-9a-zA-Z]/;
    if(!stringTest.test(this.empobj.personalInfo.father_name)) {
      this.toast.warningcustomheadAndTimeout("Father Name is Required","Personal Info",3000);
      return false;
    }else if(!stringTest.test(this.empobj.personalInfo.spouse)) {
      this.toast.warningcustomheadAndTimeout("Spouse is Required","Personal Info",3000);
      return false;
    }else if(!empidTest.test(this.empobj.personalInfo.dob)) {
      this.toast.warningcustomheadAndTimeout("Date of Birth is Required","Personal Info",3000);
      return false;
    }else if(!stringTest.test(this.empobj.personalInfo.blood_group)) {
      this.toast.warningcustomheadAndTimeout("Blood Group is Required","Personal Info",3000);
      return false;
    }else{
      return true;
    }
  }

  salaryValidate(){
    let numberTest=/[0-9]/;
      if(!numberTest.test(this.empobj.salary.gross_salary.basic_salary)){
      this.salary=true;
      this.cs();
      this.toast.warningcustomheadAndTimeout("Basic Salary is Required","Salary -> Consolidated Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.gross_salary.hra)){
      this.salary=true;
      this.cs();
      this.toast.warningcustomheadAndTimeout("HRA is Required","Salary -> Consolidated Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.gross_salary.conveyance)){
      this.salary=true;
      this.cs();
      this.toast.warningcustomheadAndTimeout("Conveyance is Required","Salary -> Consolidated Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.gross_salary.medical_allowance)){
      this.salary=true;
      this.cs();
      this.toast.warningcustomheadAndTimeout("Medical Allowance is Required","Salary -> Consolidated Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.gross_salary.bonus)){
      this.salary=true;
      this.cs();
      this.toast.warningcustomheadAndTimeout("Bonus is Required","Salary -> Consolidated Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.net_salary.pf)){
      this.netsalary=true;
      this.ns()
      this.toast.warningcustomheadAndTimeout("PF is Required","Salary -> Net Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.net_salary.loan)){
      this.netsalary=true;
      this.ns()
      this.toast.warningcustomheadAndTimeout("Loan is Required","Salary -> Net Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.net_salary.salary_advance)){
      this.netsalary=true;
      this.ns()
      this.toast.warningcustomheadAndTimeout("Advance Salary is Required","Salary -> Net Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.net_salary["it/tds"])){
      this.netsalary=true;
      this.ns()
      this.toast.warningcustomheadAndTimeout("IT/TDS is Required","Salary -> Net Salary",3000);
      return false;
    }else if(!numberTest.test(this.empobj.salary.net_salary.insurance)){
      this.netsalary=true;
      this.ns()
      this.toast.warningcustomheadAndTimeout("Insurance is Required","Salary -> Net Salary",3000);
      return false;
    }else if(!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(this.empobj.salary.bank_info.pan_no)){
      this.toast.warningcustomheadAndTimeout("Enter Valid Pan Number","Salary -> Bank Info",3000);
      this.bankinfo=true;
      this.bs();
      return false;
    }
    // else if(!this.empobj.salary.bank_info.PF_no){
    //   this.toast.warningcustomheadAndTimeout("Enter Valid Pan Number","Salary -> Bank Info",3000);
    //   this.bankinfo=true;
    //   this.bs();
    //   return false;
    // }
    else if(!this.empobj.salary.bank_info.account_name){
      this.toast.warningcustomheadAndTimeout("Enter Account Name","Salary -> Bank Info",3000);
      this.bankinfo=true;
      this.bs();
      return false;

    }else if(!this.empobj.salary.bank_info.account_number){
      this.toast.warningcustomheadAndTimeout("Enter Account Number","Salary -> Bank Info",3000);
      this.bankinfo=true;
      this.bs();
      return false;
    }else if(!this.empobj.salary.bank_info.ifsc_code){
      this.toast.warningcustomheadAndTimeout("Enter IFSC code","Salary -> Bank Info",3000);
      this.bankinfo=true;
      this.bs();
      return false;
    }else if(!this.empobj.salary.bank_info.bank_name){
      this.toast.warningcustomheadAndTimeout("Enter Bank Name","Salary -> Bank Info",3000);
      this.bankinfo=true;
      this.bs();
      return false;
    }
    else{
      return true;
    }
  }

  docValidate(){
    if(this.docarr.length==0){
      this.toast.warningcustomheadAndTimeout("Document is Required","Documents",3000);
      return false;
    }else{
      return true;
    }
  }

  // updatesuccess(){
  //   this.profileedit=false;
  //   this.currentposedit=false;
  //   this.personinfoedit=false;
  //   this.sedit=false;
  //   this.docedit=false;
  // }

  updateemp(syntax){
    switch(syntax){
      case 'e':
        {
          if(this.profileValidate()){
         this.finalupdate({"name":this.selectedEmployee.name,"profile":JSON.stringify(this.empobj.profile)},'e');
          }
          break;}
      case 'c':
        {
          if(this.positionValidate()){
          this.finalupdate({"name":this.selectedEmployee.name,"position":JSON.stringify(this.empobj.position)},'c');
          }
          break;
        };
      case 'p':
        {
          // console.log(this.empobj.personalInfo);
          if(this.personalInfoValidate()){
         this.finalupdate({"name":this.selectedEmployee.name,"personalInfo":JSON.stringify(this.empobj.personalInfo)},'p');
          }
          break;
        };
      case 's':
        {
          if(this.salaryValidate()){
          this.finalupdate({"name":this.selectedEmployee.name,"salary":JSON.stringify(this.empobj.salary)},'s');
          }
          break;
        }

      case 'd':{
            if(this.docValidate()){
            this.docupdating=true;
            var formdata=new FormData();
            let addprocess=new Promise((resolve,reject)=>{
              formdata.append("name",this.selectedEmployee.name);
              for(let i=0;i<this.docarr.length;i++){
                formdata.append("files",this.docarr[i].files);
              }
              resolve();
            });
            addprocess.then(()=>{
              this.finalupdate(formdata,'d');
            });
          }
            break
          };
      default : console.log("do nothing");
    }
  }

  docupdating=false;

  finalupdate(dataobj,syntax){
    // console.log(dataobj);
    this.service.updateempData(dataobj).subscribe((res)=>{

      // console.log(res);
      if(res['status']==403){
        this.toast.errorcustomhead(res['msg'],"Employee");
      }else{
        this.toast.successcustomhead("Updated Succesfully","Employee");
        this.cancel(syntax)
      if(this.docupdating){
        // console.log(res['docs']);
        this.docdataAdd(res['docs']);
        this.docupdating=false;
      }
    }

    },(err)=>{
      this.toast.errorstatus0();
      // console.log(err);
    })
  }

  download(index){
    window.open(this.docarr[index].files);
  //  this.service.downloadfile(this.docarr[0].files).subscribe((res)=>{
  //    console.log(res);
  //  },(err)=>{
  //    console.log(err);
  //  })
  }



}
