import { Component, OnInit,ViewChild } from '@angular/core';
import{PayrollService} from '../payroll.service';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import{ToasterService} from '../../Toast/toaster.service';
import * as XLSX from 'xlsx';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

type AOA = any[][];
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})



export class HolidaysComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  allHolidayList:any=[];
  holidayColumns:any=["date","reason","id"];
  mark_holiday_obj={"date":'',"reason":'',"id":this.service.getID()};

  constructor(public dialog: MatDialog,public service:PayrollService,public toast:ToasterService) {
    this.getholiday();
  }


  teacherlogin;
  userdata:any=[];

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('loginData'));
    if(this.userdata.designation=="Teacher"){
      this.teacherlogin=true;
    }else{
      this.teacherlogin=false;
    }
  }

  getholiday(){
    this.allHolidayList=[];
   this.service.getHolidaylist().subscribe((res)=>{
    // console.log(res);
    let data:any=res;
    this.allHolidayList=new MatTableDataSource(data);
    this.allHolidayList.paginator=this.paginator;
   },(err)=>{
     this.toast.errorstatus0();
     // console.log(err);
   })
  }



  resetOBJ(){
    this.mark_holiday_obj={"date":'',"reason":'',"id":this.service.getID()};
  }

  markHoliday(){
    // console.log(this.mark_holiday_obj);
    let stringTest=/[0-9a-zA-Z]/;
    if(!stringTest.test(this.mark_holiday_obj.date)){
      this.toast.warningcustomheadAndTimeout("Select Date","Mark Holiday",3000);
    }else if(!stringTest.test(this.mark_holiday_obj.reason)){
      this.toast.warningcustomheadAndTimeout("Enter Reason for the holiday","Mark Holiday",3000);
    }else{
    this.mark_holiday_obj.date=this.service.dateformatConvert(this.mark_holiday_obj.date);
    this.service.markholiday(this.mark_holiday_obj).subscribe((res)=>{
          if(res['status']==403){
            this.mark_holiday_obj.date=new Date(this.mark_holiday_obj.date).toISOString();
            this.toast.infocustomhead(res['msg'],"Holiday");
          }else{
            this.resetOBJ();
            this.getholiday();
            this.toast.successcustomhead(res['msg'],"Holiday");
          }

    },(err)=>{
      this.mark_holiday_obj.date=new Date(this.mark_holiday_obj.date).toISOString();
      this.toast.errorstatus0();
    });
  }
  }


  downloadholidayFILE(){
    window.open(this.service.DownloadFormatfile());
    // let arr = [{
    //   "Date":'01-01-'+new Date().getFullYear(),
    //   "Reason":'Reason for holiday',
    //   "Date Format Example":'dd-mm-yyyy'
    // }];
    // // array of objects to save in Excel
    // let binary_univers = arr

    // let binaryWS = XLSX.utils.json_to_sheet(binary_univers);

    // // Create a new Workbook
    // var wb = XLSX.utils.book_new()

    // // Name your sheet
    // XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')

    // // export your excel
    // XLSX.writeFile(wb, 'HolidayList.xlsx');
    // console.log("ex")
  }



  documentname;
docarr:AOA=[];
fileresult;
  public onFileChange(event:any) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.documentname = event.target.files[0].name;
      const [file] = event.target.files;
      // console.log(event.target.files[0])
     this.fileresult=event.target.files[0];
      // reader.readAsDataURL(file);

      // reader.onload = () => {

      //     this.fileresult= reader.result;
      //     console.log(this.fileresult);
      // };
    }
    // console.log(this.fileresult);

}

uploadholiday(){
  let stringTest=/[0-9a-zA-Z]/;
  // console.log(this.fileresult);
  if(this.fileresult){
  var formdata=new FormData();
  formdata.append("list",this.fileresult);
  this.service.uploadholidayFile(formdata).subscribe((res)=>{
    // console.log(res);
    if(res['status']==403){
      this.toast.infocustomhead(res['msg'],"Holiday File");
    }else{
      // this.documentname="";
      // this.fileresult="";
	  this.getholiday();
      this.toast.successcustomhead(res['msg'],"Holiday File");
    }

  },(err)=>{
    this.toast.errorstatus0();
    // console.log(err);
  })
}else{
  this.toast.warningcustomheadAndTimeout("Select File","Upload Holiday",3000);
}
}

err(evt){
console.log(evt);
}

	deleteHoliday(data){
		 const message = `Are you sure you want to do delete?`;

    const dialogData = new ConfirmDialogModel("Delete Holiday!", message);

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
		this.service.deleteholiday(options).subscribe((res)=>{
			if(res['status']==403){
      this.toast.infocustomhead(res['msg'],"Holiday");
			}else{
				this.getholiday();
		this.toast.successcustomhead("Holiday Deleted","Holiday");
			}
		},(err)=>{
			console.log(err);
			if(err['status']==403){
      this.toast.infocustomhead(err.error.msg,"Holiday");
			}else{
		this.toast.errorstatus0();
			}
		});
		}
    });
	}


}
