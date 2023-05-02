import { Component, OnInit ,ViewChild} from '@angular/core';
import{PayrollService} from '../payroll.service';
import{ToasterService} from '../../Toast/toaster.service';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  payrolloverview={"year": 0,"month": 0,"netcompany": 0,"netbs": 0,"nethra": 0,"netconv": 0,"netma": 0,"netbonus": 0,"netother": 0,"netpf": 0,"nettds": 0,"netsa": 0,"netins": 0,"netloan": 0,"no_of_employee": 0};

  constructor(public service:PayrollService,public toast:ToasterService) {
    this.service.getpayrollreport().subscribe((res)=>{
      // console.log(res);
      this.payrolloverview=res['data'];
      // console.log(this.payrolloverview);
    },(err)=>{
      this.toast.errorstatus0();
    })
   }

  ngOnInit() {
  }

}
