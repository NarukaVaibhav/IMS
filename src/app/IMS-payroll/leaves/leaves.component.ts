import { Component, OnInit ,ViewChild} from '@angular/core';
import{PayrollService} from '../payroll.service';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import{ToasterService} from '../../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  leaveColumns:any=["name","designation","datefrom","dateto","reason","action"];
  leaveData:any=[];
  teacherlogin;
  showapplyleave=false;
    userdata:any=[];
  applyleaveobj={"name":'',"designation":'','dateFrom':'','dateTo':'',"reason":'','half_day':1};
  constructor(public dialog: MatDialog,public service:PayrollService,public toast:ToasterService) {

  }

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('loginData'));
    this.applyleaveobj.name=this.userdata.name;
    this.applyleaveobj.designation=this.userdata.designation;
    if(this.userdata.designation=="Teacher"){
      this.teacherlogin=true;
      this.getLeaves(0);
    }else{
      this.teacherlogin=false;
      this.getLeaves(0);
    }
  }


	selectedLeaveStatus=0;
  showpending=true;
  getLeaves(status){
	  this.selectedLeaveStatus=status;
    if(status!=0){
      this.showpending=false;
    }else{
      this.showpending=true;
    }


    if(this.teacherlogin){
      this.service.getleavesbyEmp({"name":this.userdata.name,"designation":this.userdata.designation,"id":this.userdata.id,"status":status})
      .subscribe((res)=>{
        // console.log(res);
        let data:any=res;
        this.leaveData=new MatTableDataSource(data);
        this.leaveData.paginator=this.paginator;
        this.leaveData.sort=this.sort;
        if(this.leaveData.length==0){
          switch(status){
            case 0:{this.toast.infocustomhead("No Pending Leaves","Leave"); break;}
            case 1: {this.toast.infocustomhead("No Approved Leaves","Leave");break;}
            case -1: {this.toast.infocustomhead("No Rejected Leaves","Leave");break;}
            // case : console.log("nonthing")
          }

        }
      },(err)=>{
        this.toast.errorstatus0();
      });
    }else{
      this.service.getleavesbyadmin({"name":this.userdata.name,"designation":this.userdata.designation,"id":this.userdata.id,"status":status})
      .subscribe((res)=>{
        // console.log(res);
        let data:any=res;
        this.leaveData=new MatTableDataSource(data);
        this.leaveData.paginator=this.paginator;

        // this.leaveData=res;
        // this.leaveData.sort=this.sort;
        if(this.leaveData.length==0){
          switch(status){
            case 0:{this.toast.infocustomhead("No Pending Leaves","Leave"); break;}
            case 1: {this.toast.infocustomhead("No Approved Leaves","Leave");break;}
            case -1: {this.toast.infocustomhead("No Rejected Leaves","Leave");break;}
            // case : console.log("nonthing")
          }

        }
      },(err)=>{
        this.toast.errorstatus0();
      });
    }
  }


  hideleavecard(){
    this.showapplyleave=false;
    this.applyleaveobj.dateFrom="";
    this.applyleaveobj.dateTo="";
    this.applyleaveobj.reason="";
    this.getLeaves(this.selectedLeaveStatus);
    this.hafldayShow=false;
    this.halfday=false;
  }

  // dateformatConvert(date){
  //   return new Date(date).getFullYear()+'-'+('0'+[(new Date(date).getMonth())+1]).slice(-2)+'-'+('0'+new Date(date).getDate()).slice(-2);
  // }

hafldayShow=false;
halfday=false;
  checkSameDate(){
    let to=new Date(this.applyleaveobj.dateTo).getFullYear()+'-'+new Date(this.applyleaveobj.dateTo).getMonth()+'-'+new Date(this.applyleaveobj.dateTo).getDate();
    let from=new Date(this.applyleaveobj.dateFrom).getFullYear()+'-'+new Date(this.applyleaveobj.dateFrom).getMonth()+'-'+new Date(this.applyleaveobj.dateFrom).getDate();
    if(to==from){
      // console.log(true);
      this.hafldayShow=true;
    }else{
      this.hafldayShow=false;
      this.halfday=false;
      // console.log(to);
      // console.log(from);
    }
  }

  applyleave(){
    // console.log(this.applyleaveobj);
   if(this.checkValidation()){
    if(this.halfday){
      this.applyleaveobj.half_day=1;
    }else{
      this.applyleaveobj.half_day=0;
    }
    this.applyleaveobj.dateFrom=this.service.dateformatConvert(this.applyleaveobj.dateFrom);
    this.applyleaveobj.dateTo=this.service.dateformatConvert(this.applyleaveobj.dateTo);
	//console.log(this.applyleaveobj);
    this.service.applyleave(this.applyleaveobj).subscribe((res)=>{
      //console.log(res);
      if(res['status']==403){
          this.toast.infocustomhead(res['msg'],"Leave");
      }else{
        this.hideleavecard();
        this.toast.successcustomhead("Leave Applied Succesfully","Leave");
      }


    },(err)=>{
      this.toast.errorstatus0();
    });
  }
  }

  checkValidation(){
    let stringTest=/[a-zA-Z]/;
    if(new Date(this.applyleaveobj.dateTo).getFullYear()!=new Date(this.applyleaveobj.dateFrom).getFullYear() || new Date(this.applyleaveobj.dateFrom).getMonth() > new Date(this.applyleaveobj.dateTo).getMonth() || (new Date(this.applyleaveobj.dateFrom).getMonth()==new Date(this.applyleaveobj.dateTo).getMonth()&&new Date(this.applyleaveobj.dateFrom).getDate()>new Date(this.applyleaveobj.dateTo).getDate())){
      this.toast.warningcustomheadAndTimeout("Select Valid Date","Apply Leave",3000);
      return false;
    }else if(!stringTest.test(this.applyleaveobj.reason) || this.applyleaveobj.reason.length<5){
      this.toast.warningcustomheadAndTimeout("Reason Should be 5 character Long in String","Apply Leave",3000);
      return false;
    }else{
    return true;
    }
  }

  leaveUpdate(status,data){
    // console.log(status,data)

	 let message;
	 let title;
	 if(status==1){
		 message="Once you Accept it cannot be roll back.Wish to Accept Leave?";
		 title="Accept Leave!";
	 }else{
		 message="Once you Reject it cannot be roll back.Wish to Reject Leave?";
		 title="Reject Leave!";
	 }

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
    this.service.updateleave({"name":this.userdata.name,"designation":this.userdata.designation,"status":status,"id":this.userdata.id,"ename":data.name,"leaveid":data.id}).subscribe((res)=>{
      // console.log(res);
      this.getLeaves(0);
      if(res['status']==403){
            this.toast.infocustomhead(res['msg'],"Leave");
      }else{
      switch(status){
        case 1: {this.toast.successcustomhead("Leave Approved","Leave");break;}
        case -1: {this.toast.successcustomhead("Leave Rejected","Leave");break;}
        // case : console.log("nonthing")
      }
    }
    },(err)=>{
      this.toast.errorstatus0();
    });
	}
    });
  }


  confirmDialog(): void {

  }

  leaveDelet(data){
	 // console.log(data);
	 const message = `Are you sure you want to do delete?`;

    const dialogData = new ConfirmDialogModel("Delete Leave!", message);

    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
	  const options = {
			body: {
				id: data.id,
					},
				};
	  this.service.deleteleave(options).subscribe((res)=>{
			console.log(res);
		 if(res['status']==403){
            this.toast.infocustomhead(res['msg'],"Leave");
      }else{
		  this.getLeaves(this.selectedLeaveStatus);
	   this.toast.successcustomhead(res['msg'],'Leave');
	  }
	  },(err)=>{
		  this.toast.errorstatus0();
	  });
	  }
    });

  }

}
