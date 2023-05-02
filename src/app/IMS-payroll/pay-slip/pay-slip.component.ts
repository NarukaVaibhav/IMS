import { Component, OnInit } from '@angular/core';
import{PDFGENERATEService} from '../../pdfgenerate.service';
import { PayrollService } from '../payroll.service';
import { ToasterService } from 'src/app/Toast/toaster.service';
@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css']
})
export class PaySlipComponent implements OnInit {

  emplist:any=[];
  constructor(private pdf:PDFGENERATEService,public service:PayrollService,public toast:ToasterService) {
    this.service.getallEmployee().subscribe((res)=>{
      console.log(res);
      this.emplist=res;
    },(err)=>{
      this.toast.errorstatus0();
    });
  }
  montharray=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  teacherlogin;
  userdata:any=[];
  obj:any={};
  selectedEmpemail;

  showmonth:any=[];
  showyear:any=[];
  ngOnInit() {
    this.showyearmonth();
    this.userdata=JSON.parse(localStorage.getItem('loginData'));
    if(this.userdata.designation=="Teacher"){
      this.teacherlogin=true;
      this.selectedEmpemail=this.userdata.emailId;
      this.obj={"ename":this.userdata.name,"month":'',"year":''};
    }else{
      this.obj={"ename":'',"month":'',"year":''};
      // this.selectedEmpemail="netparam.shubhamshukla@gmail.com";
      // this.getPayslip();
      this.teacherlogin=false;
    }
  }

  showyearmonth(){
    let year= new Date().getFullYear();
    let month=new Date().getMonth();
    // console.log([year-1,year])
    if(month==1){
      this.showmonth=[{"m":"Feb",'n':'02'},{"m":"Jan",'n':'01'},{"m":"Dec",'n':'12'}];
      this.showyear=[year-1,year];
    }else if(month==0){
      this.showmonth=[{"m":"Jan",'n':'01'},{"m":"Dec",'n':'12'},{"m":"Nov",'n':'11'}];
      this.showyear=[year-1,year];
    }else{
      let i=month-2;
      let j=month;
      this.showyear=[year];
      console.log(i,month)
      for(i;i<=month;i++){
          this.showmonth.push({'m':this.montharray[j],'n':('0'+(j+1)).slice(-2)});
          // console.log(month)
          j--;
        }
        // console.log(this.showmonth);
    }
  }

  selectemp(emp){
    this.obj.ename=emp.name;
    this.selectedEmpemail=emp.emailId;
  }

  monthname;
  selectmonth(month){
    // console.log(month)
    this.obj.month=month.n;
    this.monthname=month.m;
    // console.log(this.obj.month)
  }
  selectyear(year){
    this.obj.year=year;
  }



  getPayslip(){
    // console.log(this.obj);
    if(this.checkvalidation()){
    this.service.GetPaySlip(this.obj).subscribe((res)=>{
      if(res['status']==403){
        this.toast.infocustomhead(res['msg'],"Pay Slip");
      }else{
      // console.log(res['data']);
      let process=new Promise((resolve,reject)=>{
        this.pdf.setPdfSLIP(res['data'],'March','2020',this.selectedEmpemail,this.obj.ename);
        resolve();
      });
      process.then(()=>{
        this.pdf.DownloadSLIPpdf(this.obj.ename+'_'+this.monthname+'_'+this.obj.year+"_Payslip");
      });

      }
    },(err)=>{
      if(err.error.status==403){
        this.toast.infocustomhead("No Data For selected Month","Pay Slip");
      }else{
      this.toast.errorstatus0();
      }
      // console.log(err);
    });
  }
  }

  checkvalidation(){
    if(!this.obj.ename){
        this.toast.errorcustomhead("Select Employee","PAY SLIP");
      return false;
    }else if(!this.obj.month){
      this.toast.errorcustomhead("Select Month","PAY SLIP");
      return false;
    }else if(!this.obj.year){
      this.toast.errorcustomhead("Select Year","PAY SLIP");
      return false;
    }else{
      return true;
    }
  }
}
