import { Component, OnInit } from '@angular/core';
import{PayrollService} from '../../IMS-payroll/payroll.service';
import { ToasterService } from 'src/app/Toast/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-constraint',
  templateUrl: './ad-constraint.component.html',
  styleUrls: ['./ad-constraint.component.css']
})
export class AdConstraintComponent implements OnInit {

  emp_list:any=[];
  constructor(public service:PayrollService,public toast:ToasterService,public router:Router) {


  }
   tempdata:any=[];
   update=false;
  constraint_obj={
    "pl_month":"",
    "saturday_off":[],
    "alt_saturday":[],
    "maternity_leave":[""],
    "office_shift_hours":"",
    "salary_days":[""]
  }

  showpl=false;

  ngOnInit() {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return true;
    // };
    // this.router.onSameUrlNavigation='ignore';
    console.log("init")
    this.getPL();
    this.getCOnstraint();
  }

reload(){

  this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
  this.router.onSameUrlNavigation='reload';
  this.router.navigate(['./Master/Pslip']);
}

  getCOnstraint(){
    this.emp_list=[];
    this.reset();
    this.service.getallEmployee().subscribe((res)=>{
      this.emp_list=res;
      // Get constraint
      this.service.getConstraint().subscribe((res)=>{

        if(res['status']!=403){
          this.update=true;
          console.log(res['0']);
          this.constraint_obj.office_shift_hours=res['0'].office_shift_hours;
          this.constraint_obj.salary_days[0]=res['0'].salary_days;
          // this.constraint_obj.maternity_leave[0]=res['0'].maternity_leave;
          this.constraint_obj.pl_month=res['0'].pl_month.toString();
          if(res['0'].alt_saturday[0]==0 || res['0'].alt_saturday[0]==1){
            this.constraint_obj.alt_saturday[0]=res['0'].alt_saturday[0].toString();
          }else{
            for(let i=0;i<res['0'].alt_saturday.length;i++){
                for(let j=0;j<this.emp_list.length;j++){
                  if(res['0'].alt_saturday[i]==this.emp_list[j].name){
                    this.selectedEmp_alt_sat_off.push(this.emp_list[j]);
                    break;
                  }
                }
            }
            this.show_alt_sat_OFF=true;
          }

          if(res['0'].saturday_off[0]==0 || res['0'].saturday_off[0]==1){
            this.constraint_obj.saturday_off[0]=res['0'].saturday_off[0].toString();
            // console.log(this.constraint_obj.saturday_off[0])
          }else{
            for(let i=0;i<res['0'].saturday_off.length;i++){
              for(let j=0;j<this.emp_list.length;j++){
                if(res['0'].saturday_off[i]==this.emp_list[j].name){
                  this.selectedEmp_sat_off.push(this.emp_list[j]);
                  break;
                }
              }
          }
          this.show_alt_sat_OFF=true;
          }

          if(res['0'].maternity_leave[0]==0 || res['0'].maternity_leave[0]==1 ){
            this.constraint_obj.maternity_leave[0]=res['0'].maternity_leave[0].toString();
            // console.log(this.constraint_obj.maternity_leave[0])
          }
          // else if(res['0'].maternity_leave==0 || res['0'].maternity_leave==1 ){
          //   this.constraint_obj.maternity_leave[0]=res['0'].maternity_leave.toString();
          // }
          else{
            for(let i=0;i<res['0'].maternity_leave.length;i++){
              for(let j=0;j<this.emp_list.length;j++){
                if(res['0'].maternity_leave[i]==this.emp_list[j].name){
                  this.selectedEmp_maternity_off.push(this.emp_list[j]);
                  break;
                }
              }
          }
          this.show_maternity_OFF=true;
          }
        }
      },(err)=>{
        this.toast.errorstatus0();
        console.log(err);
      });
    },(err)=>{
      this.toast.errorstatus0();
    });
  }

 reset(){
  this.constraint_obj={
    "pl_month":"",
    "saturday_off":[],
    "alt_saturday":[],
    "maternity_leave":[],
    "office_shift_hours":"",
    "salary_days":[""]
  }
  this.selectedEmp_alt_sat_off=[];
  this.selectedEmp_maternity_off=[];
  this.selectedEmp_sat_off=[];
  this.show_alt_sat_OFF=false;
  this.show_maternity_OFF=false;
  this.show_sat_OFF=false;
 }

 selectedEmp_sat_off:any=[];
 show_sat_OFF=false;
 sat_OFF(data){
  this.constraint_obj.saturday_off=[];
   if(data.id==0 || data.id==1){
    this.constraint_obj.saturday_off.push(data.id);
    // console.log(this.constraint_obj);
    this.show_sat_OFF=false;
    this.selectedEmp_sat_off=[];
   }else{
     if(this.selectedEmp_sat_off.length==0){
       this.selectedEmp_sat_off.push(data);
       this.show_sat_OFF=true;
     }else{
       let temparr:any=[]
       let found=false;
      for(let i=0;i<this.selectedEmp_sat_off.length;i++){
          if(this.selectedEmp_sat_off[i].id==data.id){
            found=true;
            this.toast.infocustomhead(data.name+' Already Selected',"Saturday Off");
            break;
          }
      }
      if(!found){
        this.show_sat_OFF=true;
        this.selectedEmp_sat_off.push(data);
      }
     }

   }

 }

 selectedEmp_alt_sat_off:any=[];
 show_alt_sat_OFF=false;
 alt_sat_OFF(data){
  this.constraint_obj.alt_saturday=[];
  if(data.id==0 || data.id==1){
    this.constraint_obj.alt_saturday.push(data.id);
    this.selectedEmp_alt_sat_off=[];
    this.show_alt_sat_OFF=false;
   }else{
     if(this.selectedEmp_alt_sat_off.length==0){
       this.selectedEmp_alt_sat_off.push(data);
       this.show_alt_sat_OFF=true;
     }else{
       let temparr:any=[]
       let found=false;
      for(let i=0;i<this.selectedEmp_alt_sat_off.length;i++){
          if(this.selectedEmp_alt_sat_off[i].id==data.id){
            found=true;
            this.toast.infocustomhead(data.name+' Already Selected',"Alt Saturday Off");
            break;
          }
      }
      if(!found){
        this.show_alt_sat_OFF=true;
        this.selectedEmp_alt_sat_off.push(data);
      }
     }

   }

 }


 selectedEmp_maternity_off:any=[];
 show_maternity_OFF=false;
 materniity_Leave(data){

this.constraint_obj.maternity_leave=[];
  if(data.id==0 || data.id==1){

    this.constraint_obj.maternity_leave.push(data.id);
    console.log(!this.constraint_obj.maternity_leave['0'])
    this.selectedEmp_maternity_off=[];
    this.show_maternity_OFF=false;
   }else{
     if(this.selectedEmp_maternity_off.length==0){
       this.selectedEmp_maternity_off.push(data);
       this.show_maternity_OFF=true;
     }else{
       let temparr:any=[]
       let found=false;
      for(let i=0;i<this.selectedEmp_maternity_off.length;i++){
          if(this.selectedEmp_maternity_off[i].id==data.id){
            found=true;
            this.toast.infocustomhead(data.name+' Already Selected',"Alt Saturday Off");
            break;
          }
      }
      if(!found){
        this.show_maternity_OFF=true;
        this.selectedEmp_maternity_off.push(data);
      }
     }

   }
 }


 delete_sat_off(emp){
  let temparr :any=[];
  let del_satoff=new Promise((resolve,reject)=>{
    for(let i=0;i<this.selectedEmp_sat_off.length;i++){
      if(emp.id!=this.selectedEmp_sat_off[i].id){
        temparr.push(this.selectedEmp_sat_off[i]);
      }
     }
    resolve();
  });
  del_satoff.then(()=>{
    if(temparr.length==0){
      this.show_sat_OFF=false;
    }
    this.selectedEmp_sat_off=temparr;
  });

 }

 delete_alt_sat_off(emp){
  let temparr :any=[];
  let del_satoff=new Promise((resolve,reject)=>{
    for(let i=0;i<this.selectedEmp_alt_sat_off.length;i++){
      if(emp.id!=this.selectedEmp_alt_sat_off[i].id){
        temparr.push(this.selectedEmp_alt_sat_off[i]);
      }
     }
    resolve();
  });
  del_satoff.then(()=>{
    if(temparr.length==0){
      this.show_sat_OFF=false;
    }
    this.selectedEmp_alt_sat_off=temparr;
  });

}

delete_maternity_off(emp){
  let temparr :any=[];
  let delmaternityOff=new Promise((resolve,reject)=>{
    for(let i=0;i<this.selectedEmp_maternity_off.length;i++){
      if(emp.id!=this.selectedEmp_maternity_off[i].id){
        temparr.push(this.selectedEmp_maternity_off[i]);
      }
     }
    resolve();
  });
  delmaternityOff.then(()=>{
    if(temparr.length==0){
      this.show_maternity_OFF=false;
    }
    this.selectedEmp_maternity_off=temparr;
  });

}


Add_Constraint(){
  if(this.checkvalidation()){
    this.tempdata=this.constraint_obj;
    let process=new Promise((resolve,reject)=>{
      if(this.constraint_obj.saturday_off.length==0){
        this.constraint_obj.saturday_off=[];
        for(let i=0;i<this.selectedEmp_sat_off.length;i++){
          this.constraint_obj.saturday_off.push(this.selectedEmp_sat_off[i].name);
        }
      }
      if(this.constraint_obj.alt_saturday.length==0){
          this.constraint_obj.alt_saturday=[];
        for(let i=0;i<this.selectedEmp_alt_sat_off.length;i++){
          this.constraint_obj.alt_saturday.push(this.selectedEmp_alt_sat_off[i].name);
        }
      }
      // console.log(this.constraint_obj)
      if(this.constraint_obj.maternity_leave.length==0){
        // console.log(this.selectedEmp_maternity_off);
        this.constraint_obj.maternity_leave=[];
      for(let i=0;i<this.selectedEmp_maternity_off.length;i++){
        this.constraint_obj.maternity_leave.push(this.selectedEmp_maternity_off[i].name);
      }
    }

      resolve();
    });
  process.then(()=>{
    // console.log(this.constraint_obj);
    let temp=JSON.stringify(this.constraint_obj.alt_saturday);
    this.constraint_obj.alt_saturday=[];
    this.constraint_obj.alt_saturday.push(temp);
    let temp1=JSON.stringify(this.constraint_obj.saturday_off);
    this.constraint_obj.saturday_off=[];
    this.constraint_obj.saturday_off.push(temp1);
    let temp2=JSON.stringify(this.constraint_obj.maternity_leave);
    this.constraint_obj.maternity_leave=[];
    this.constraint_obj.maternity_leave.push(temp2);

    if(!this.update){
    this.service.addConstraint(this.constraint_obj).subscribe((res)=>{
      // this.constraint_obj=this.tempdata;
      if(res['status']==200){
        // console.log(res);
        this.toast.successcustomhead("Added Succesfully","Constraint");
        this.getCOnstraint();
        // window.location.reload();
      }else{
        this.constraint_obj=this.tempdata;
        this.toast.infocustomhead(res['msg'],"Constraint");
        // window.location.reload();
      }

    },(err)=>{
      this.constraint_obj=this.tempdata;
      this.toast.errorstatus0();
    });
  }else{
    // console.log(this.constraint_obj);
    this.service.updateConstraint(this.constraint_obj).subscribe((res)=>{
      console.log(res);


      if(res['status']==200){
        console.log(res);
        this.toast.successcustomhead(res['msg'],"Update Constraint");
        // this.reload();
        this.getCOnstraint();

        // window.location.reload();
      }else{
        this.constraint_obj=this.tempdata;
        this.toast.infocustomhead(res['msg'],"Update Constraint");
      }
    },(err)=>{
      this.constraint_obj=this.tempdata;
      console.log(err);
      this.toast.errorstatus0();
    });
  }
  });

  }
}


checkvalidation(){

  let stringTest=/[a-z]/;
  if(!this.constraint_obj.pl_month){
    this.toast.warningcustomheadAndTimeout("Select PL month","Constraint",3500);
    return false;
  }else if(this.constraint_obj.saturday_off.length==0 && this.selectedEmp_sat_off.length==0){
    this.toast.warningcustomheadAndTimeout("Select Saturday Off","Constraint",3500);
    return false;
  }else if(this.constraint_obj.alt_saturday.length==0 && this.selectedEmp_alt_sat_off.length==0){
    this.toast.warningcustomheadAndTimeout("Select Alt Saturday Off","Constraint",3500);
    return false;
  }else if(this.constraint_obj.maternity_leave.length==0 && this.selectedEmp_maternity_off.length==0){
    this.toast.warningcustomheadAndTimeout("Maternity Leave is Required","Constraint",3500);
    return false;
  }else if(!this.constraint_obj.office_shift_hours){
    this.toast.warningcustomheadAndTimeout("Office Shift Hours is Required","Constraint",3500);
    return false;
  }else if(!this.constraint_obj.salary_days[0]){
    this.toast.warningcustomheadAndTimeout("Salary Days is Required","Constraint",3500);
    return false;
  }else {
    return true;
  }
}


plobj:any={};
arrpl:any=[];
resetpl(){
  this.plobj={};
  this.arrpl=[];
  this.ShowPL=false;
  this.showpl=false;
}
hidecard(){
  this.showpl=false;
}

ShowPL=false;
addPL(empname){
  let ctr=0;
  if(this.plobj[empname]){
        this.toast.infocustomhead(empname+' is Already Added',"PL");
  }else{
    this.plobj[empname]={"avail_pl":1};
    this.arrpl.push({"name":empname});
    this.ShowPL=true;
  }

  // else{
  //   for(let i=0;i<Object.keys(this.plobj).length;i++){
  //     if(empname==Object.keys(this.plobj)[i]){
  //       ctr=1;
  //       break;
  //     }
  //   }
  //   if(ctr==1){
  //     this.toast.infocustomhead(empname+' is Already Added',"PL");
  //   }else{
  //     this.plobj.push({empname:{"avail_pl":''}});
  //   }
  // }
  console.log(this.plobj)
}

PL(){
  console.log(this.plobj)
  let obj:any={};
  obj=this.PLList;
  console.log(this.PLList);
  let keys=Object.keys(this.plobj);
  let process=new Promise((resolve,reject)=>{
    if(Object.keys(this.PLList).length>0) {
      for (let i = 0; i < keys.length; i++) {
        if (!this.PLList[keys[i]]) {
          obj[keys[i]] = this.plobj[keys[i]];
        } else {
          obj[keys[i]] = this.plobj[keys[i]];
        }
      }
    }else{
      obj=this.plobj;
    }
    resolve();
  });
  process.then(()=>{
    console.log(obj);
  this.service.addPL({"data":JSON.stringify(obj)}).subscribe((res)=>{
    console.log(res);
    this.toast.successcustomhead("Added Succesfully","PL");
    this.resetpl();
    this.getPL();
  },(err)=>{
    console.log(err);
    this.toast.errorstatus0();
  });
});
}

PLList:any=[];
plkeys:any=[];
getPL(){
  this.service.getPL().subscribe((res)=>{
    console.log(res['0']);
	if(res['0'].user_pl){
    this.PLList=res['0'].user_pl;
    this.plkeys=Object.keys(this.PLList);
    console.log(this.plkeys);
	}
  },(err)=>{
    console.log(err);
    this.toast.errorstatus0();
  });
}

}
