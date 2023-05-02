import { Component, OnInit } from '@angular/core';
import{PayrollService} from '../payroll.service';
import{ToasterService} from '../../Toast/toaster.service';
@Component({
  selector: 'app-payroll-attendance',
  templateUrl: './payroll-attendance.component.html',
  styleUrls: ['./payroll-attendance.component.css']
})
export class PayrollAttendanceComponent implements OnInit {
  showatt=false;
  emplist:any=[];
  emplistselect:any=[];
  weekarray=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
  montharray=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  daysinmonth:any=[];
  datefrom=new Date(new Date().getFullYear(), new Date().getMonth(),1);
  dateto=new Date(new Date().getFullYear(), new Date().getMonth(),(32-new Date(new Date().getFullYear(), new Date().getMonth(),32).getDate()));

  constructor(public service:PayrollService,public toast:ToasterService) {

  }


  teacherlogin;
  userdata:any=[];
  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('loginData'));
	this.getEmpListSelect();
    if(this.userdata.designation=="Teacher"){
      this.teacherlogin=true;
      this.currentdaysmonth(this.datefrom,this.dateto);
    }else{
      this.teacherlogin=false;
      this.currentdaysmonth(this.datefrom,this.dateto);
    }
  }

getEmpListSelect(){
	this.service.getallEmployee().subscribe((res)=>{
        // console.log(res);
        this.emplistselect=res;
      },(err)=>{
        this.toast.errorstatus0();
      });
}

  searchAttandence(){
    // console.log(new Date(this.dateto).getDate())
    if(new Date(this.dateto).getMonth() != new Date(this.datefrom).getMonth() || new Date(this.dateto).getFullYear() != new Date(this.datefrom).getFullYear()){
      this.toast.warningcustomhead("Month and Year should be Same","Search");
    }else{
      this.currentdaysmonth(this.datefrom,this.dateto);
    }

  }

    showdays:any=[];
    selectedDaylength={"start":0,"end":10};


    currentdaysmonth(first,last){
      this.daysinmonth=[];
      this.showdays=[];
      this.selectedDaylength={"start":0,"end":10};
      // let firstday=new Date(new Date().getFullYear(), new Date().getMonth()).getDay();
     let firstday=new Date(first).getDay();
      // console.log(this.weekarray[firstday]);
      // let daysinmonth=32-new Date(new Date().getFullYear(), new Date().getMonth(),32).getDate();
     let daysinmonth=new Date(last).getDate();
      // console.log(daysinmonth);
      let dt=new Date().getFullYear()+'-'+('0'+[(new Date(first).getMonth())+1]).slice(-2)+'-';
    //  console.log(dt);


     let setdate=new Promise((resolve,reject)=>{
       let k=1;
      for(let i=new Date(first).getDate();i<=daysinmonth;i++){

        if(firstday<7){
          this.daysinmonth.push({"date":i,"day":this.weekarray[firstday],'month':this.montharray[new Date().getMonth()]});
          if(k<=10){
            this.showdays.push({"date":i,"day":this.weekarray[firstday],'month':this.montharray[new Date().getMonth()]});
          }
          firstday++;
        }else{
          this.daysinmonth.push({"date":i,"day":this.weekarray[0],'month':this.montharray[new Date().getMonth()]});
          if(k<=10){
            this.showdays.push({"date":i,"day":this.weekarray[0],'month':this.montharray[new Date().getMonth()]});
          }
          firstday=1;
        }
        k++;
      }
       resolve();
     });

     setdate.then(()=>{
      this.get_current_month_attendance(dt+('0'+[(new Date(first).getDate())]).slice(-2),dt+('0'+[(new Date(last).getDate())]).slice(-2));
     });
      // console.log(this.daysinmonth);

    }



    next_ten_Days(){
      // console.log(this.selectedDaylength);
      if(this.selectedDaylength.end<this.daysinmonth.length){
      let nextdays:any=[];
      let nextday=new Promise((resolve,reject)=>{
        for(let i=this.selectedDaylength.end;i<this.daysinmonth.length;i++){
          if(i<this.selectedDaylength.end+10){

            for(let k=0;k<this.emplist.length;k++){
            this.emplist[k].temp.push(this.emplist[k].days[i]);
            }
            nextdays.push(this.daysinmonth[i]);
          }else{
            break;
          }
      }
      resolve();
      });
      nextday.then(()=>{
        this.showdays=nextdays;
        for(let k=0;k<this.emplist.length;k++){
          this.emplist[k].show=this.emplist[k].temp;
          this.emplist[k].temp=[];
        }

        this.selectedDaylength.start=this.selectedDaylength.end;
        this.selectedDaylength.end=this.selectedDaylength.end+10;
      });
    }
    }

    back_ten_Days(){
      // console.log(this.selectedDaylength);
      if(this.selectedDaylength.start!=0){

        let backdays:any=[];
        let backday=new Promise((resolve,reject)=>{
          for(let i=this.selectedDaylength.start-10;i<this.daysinmonth.length;i++){
            if(i<this.selectedDaylength.start){
              backdays.push(this.daysinmonth[i]);
              for(let k=0;k<this.emplist.length;k++){
                this.emplist[k].temp.push(this.emplist[k].days[i]);
                }
            }else{
              break;
            }
        }
          resolve();
        });
        backday.then(()=>{
          for(let k=0;k<this.emplist.length;k++){
            this.emplist[k].show=this.emplist[k].temp;
            this.emplist[k].temp=[];
          }
          this.showdays=backdays;
          this.selectedDaylength.end=this.selectedDaylength.start;
          this.selectedDaylength.start=this.selectedDaylength.start-10;
        });
      }
    }


    empdata:any=[];
    tempemplist:any=[];
    get_current_month_attendance(sdate,ldate){
      this.emplist=[];
      this.tempemplist=[];
      this.empdata=[];

      // Admin
      if(!this.teacherlogin){
      this.service.getattendance({"startdate":sdate,"enddate":ldate}).subscribe((res)=>{
        // console.log(res);
        this.empdata=res['data'];
        let list=Object.keys(res['data']);
        // this.emplist=Object.keys(res['data']);
        let ctr=0;
         for(let i=0;i<list.length;i++){
           this.AddAttDataIntoArr(this.empdata[list[i]],list[i],i,ctr);
         }

        this.emplist=this.tempemplist;
        // console.log(this.tempemplist);
      },(err)=>{
        this.toast.errorstatus0();
        // console.log(err);
      });
    }

    // Teacher
    else{
          this.service.getTeacherattendance({"startdate":sdate,"enddate":ldate,"id":this.userdata.id}).subscribe((res)=>{
            // console.log(res);
            if(res['response'].length==0){
              this.toast.infocustomhead("No Data Available","Attendance");
            }else{
            this.AddAttDataIntoArr(res['response'],this.userdata.name,0,0);
            this.emplist=this.tempemplist;
            // console.log(this.emplist);
            }
          },(err)=>{
            this.toast.errorstatus0();
            // console.log(err);
          });
    }
    }


    AddAttDataIntoArr(dataarr,empname,index,ctr){
		// console.log(dataarr);
		// console.log(this.emplistselect);
      this.tempemplist.push({"emp":empname,"days":[],"show":[],"temp":[],workingdays:''});
          for(let j=0;j<this.daysinmonth.length;j++){
              // working days
            this.tempemplist[index].workingdays=dataarr.length;
              for(let k=0;k<dataarr.length;k++){
                  if(new Date(dataarr[k].date).getDate()==this.daysinmonth[j].date){
                    // console.log(new Date(this.empdata[list[index]][k].date));
                    if(j<10){
                      this.tempemplist[index].show.push({"present":dataarr[k].attendance,"date":this.daysinmonth[j].date,"data":dataarr[k]});
                      this.tempemplist[index].days.push({"present":dataarr[k].attendance,"date":this.daysinmonth[j].date,"data":dataarr[k]});
                    }else{
                      this.tempemplist[index].days.push({"present":dataarr[k].attendance,"date":this.daysinmonth[j].date,"data":dataarr[k]});
                    }

                    ctr=1;
                      break;
                  }
              }

              if(ctr==0){
                if(j<10){
                  this.tempemplist[index].show.push({"present":'A',"date":this.daysinmonth[j].date});
                  this.tempemplist[index].days.push({"present":'A',"date":this.daysinmonth[j].date});
                }else{
                  this.tempemplist[index].days.push({'present':'A',"date":this.daysinmonth[j].date});
                }

              }else{
                ctr=0;
              }


          }
    }




    searchemp;
    searchEmployee(){
      // console.log(this.searchemp) ;
      this.emplist=this.tempemplist.filter((data)=>data.emp.toLowerCase().indexOf(this.searchemp.toLowerCase()) > -1);
    }


  mark_att_obj={"id":'',"date":new Date().toISOString(),'timefrom':'09:00',"timeto":'18:00','attendance':'P',"ename":''};
  change_emp_mark_att(emp){
    // console.log(emp);
    this.mark_att_obj.id=emp.id;
    this.mark_att_obj.ename=emp.name;
  }

  attan(){
    if(this.showatt){
      this.showatt=false;
	  this.update_attan=false;
	  this.at_present=true;
	  this.at_absent=false;
	  this.mark_att_obj={"id":'',"date":new Date().toISOString(),'timefrom':'09:00',"timeto":'18:00','attendance':'P',"ename":''};
      // this.currentdaysmonth(this.datefrom,this.dateto);
    }else{
      this.showatt=true;
      this.getEmpListSelect();
    }



  }

  checkDatevalidation(){

    if(new Date(this.mark_att_obj.date).getFullYear()>new Date().getFullYear() || (new Date(this.mark_att_obj.date).getMonth()>new Date().getMonth() && new Date(this.mark_att_obj.date).getFullYear()==new Date().getFullYear())|| (new Date(this.mark_att_obj.date).getDate()>new Date().getDate() && new Date(this.mark_att_obj.date).getMonth()==new Date().getMonth() && new Date(this.mark_att_obj.date).getFullYear()==new Date().getFullYear()) ){
      return true;
    }else{
      return false;
    }
  }
  update_attan=false;
  selectedAttanData:any;
  at_present=true;
  at_absent=false;

  ps(){
	  if(this.at_present){
    this.at_absent=false;

  }
  }

  asp(){

	  if(this.at_absent){
    this.at_present=false;
  }
  }

  threeday=false;
  editAttan(data,day)
  {
	  if(day.data){
	  // console.log(data);
	  // console.log(day);
	  let gap=new Date().getDate()-day.date;
	  // console.log(gap);
	  if(gap<=3){
		  this.threeday=true;
		  }else{
		  this.threeday=false;
	  }
	  this.selectedAttanData=day;
	  this.mark_att_obj.date=day.data.date;
	  this.mark_att_obj.timefrom=day.data.timeFrom;
	  this.mark_att_obj.timeto=day.data.timeTo;
	  this.mark_att_obj.id=day.data.empid;
	  this.mark_att_obj.ename=day.data.ename;
	  if(day.data.attendance=='P'){
		  this.at_present=true;
		  this.at_absent=false;
	  }else{
		  this.at_present=false;
		  this.at_absent=true;
	  }
	  this.update_attan=true;
	  // console.log(this.mark_att_obj);

	  this.showatt=true;
	  }else{
		  this.toast.infocustomhead("No Entry for this Date","Attendance");
	  }
  }

  updateAttendance(){
	  // console.log(this.mark_att_obj);
	  if(this.mark_att_obj.timefrom>=this.mark_att_obj.timeto){
      this.toast.warningcustomheadAndTimeout("'Time From' should be less than 'Time to'","Attendance -> Time",3000);
    }else if(this.at_absent==false && this.at_present==false){
		//console.log(this.at_absent,this.at_present);
		this.toast.warningcustomheadAndTimeout("Select Present/Absent","Attendance -> Time",3000);
	}
	else{
      // Saving NOW after Validating
    // console.log(this.mark_att_obj);
    let tempdate=this.mark_att_obj.date;
	if(this.at_absent){
		this.mark_att_obj.attendance='A';
	}else{
		this.mark_att_obj.attendance='P';
	}
	// console.log({"empid":this.mark_att_obj.id,"id":this.selectedAttanData.data.id,"attendance":this.mark_att_obj.attendance,"timefrom":this.mark_att_obj.timefrom,"timeto":this.mark_att_obj.timeto});
	//api call
		this.service.updateattendance({"empid":this.mark_att_obj.id,"id":this.selectedAttanData.data.id,"attendance":this.mark_att_obj.attendance,"timefrom":this.mark_att_obj.timefrom,"timeto":this.mark_att_obj.timeto}).subscribe((res)=>{
			 if(res['status']==403){
        this.toast.infocustomhead(res['msg'],"Attendance");
      } else{
			this.toast.successcustomhead("Updated Succesfully","Attendance");
			this.currentdaysmonth(this.datefrom,this.dateto);
			// console.log(res);
	  }
		},(err)=>{
			this.toast.errorstatus0();
			// console.log(err);
		});


	}
  }


  deleteAttendance(){
	  //{"empid":this.mark_att_obj.id,"id":this.selectedAttanData.data.id}
	  var formdata=new FormData();
	  formdata.append("empid",this.mark_att_obj.id);
	  formdata.append("id",this.selectedAttanData.data.id);
	  const options = {
			body: {
				empid: this.mark_att_obj.id,
				id: this.selectedAttanData.data.id,
					},
				};

	  this.service.deleteattendance(options).subscribe((res)=>{
			 if(res['status']==403){
        this.toast.infocustomhead(res['msg'],"Attendance");
      } else{
				this.attan();
			this.toast.successcustomhead("Deleted Succesfully","Attendance");
			this.currentdaysmonth(this.datefrom,this.dateto);
	  }
		},(err)=>{
			this.toast.errorstatus0();
			// console.log(err);
		});
  }
  // dateformatConvert(date){
  //   return new Date(date).getFullYear()+'-'+('0'+[(new Date(date).getMonth())+1]).slice(-2)+'-'+('0'+new Date(date).getDate()).slice(-2);
  // }
  saveAttendance(){
    let stringTest=/[0-9a-zA-Z]/;
    if(!this.mark_att_obj.ename){
      this.toast.warningcustomheadAndTimeout("Select Employee","Attendance",3000);
    }else if(!stringTest.test(this.mark_att_obj.date)){
      this.toast.warningcustomheadAndTimeout("Select Date","Attendance -> Date",3000);
    }
    else if(this.checkDatevalidation()){
      this.toast.warningcustomheadAndTimeout("Date cannot be higher than Current Date","Attendance -> Date",3000);
    }else if(!stringTest.test(this.mark_att_obj.timefrom)||!stringTest.test(this.mark_att_obj.timeto)){
      this.toast.warningcustomheadAndTimeout("Select 'Time To' and 'Time From","Attendance -> Time",3000);
    }
    else if(this.mark_att_obj.timefrom>=this.mark_att_obj.timeto){
      this.toast.warningcustomheadAndTimeout("'Time From' should be less than 'Time to'","Attendance -> Time",3000);
    }else if(this.at_absent==false && this.at_present==false){
		console.log(this.at_absent,this.at_present);
		this.toast.warningcustomheadAndTimeout("Select Present/Absent","Attendance -> Time",3000);
	}
	else{
      // Saving NOW after Validating
    // console.log(this.mark_att_obj);
    let tempdate=this.mark_att_obj.date;
	if(this.at_absent){
		this.mark_att_obj.attendance='A';
	}else{
		this.mark_att_obj.attendance='P';
	}
    this.mark_att_obj.date=this.service.dateformatConvert(this.mark_att_obj.date);
    this.service.markattendance(this.mark_att_obj).subscribe((res)=>{
      if(res['status']==403){
        this.toast.infocustomhead(res['msg'],"Attendance");
      } else{
        this.toast.successcustomhead(res['msg'],"Attendance");
        this.currentdaysmonth(this.datefrom,this.dateto);
      }
      this.mark_att_obj.date=new Date(tempdate).toISOString();
      // console.log(res);
    },(err)=>{
      this.mark_att_obj.date=new Date(tempdate).toISOString();
      this.toast.errorstatus0();
      // console.log(err);
    })
    this.mark_att_obj.date=[(new Date(this.mark_att_obj.date).getMonth())+1]+'/'
  }
}


}
