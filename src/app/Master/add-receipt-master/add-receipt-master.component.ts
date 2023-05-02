import { Component, OnInit } from '@angular/core';
import {MasterServiceService} from '../../services/master-service.service';
import{ToasterService} from '../../Toast/toaster.service';
@Component({
  selector: 'app-add-receipt-master',
  templateUrl: './add-receipt-master.component.html',
  styleUrls: ['./add-receipt-master.component.css']
})
export class AddReceiptMasterComponent implements OnInit {

  constructor(public http:MasterServiceService,public toast:ToasterService) { }

  ngOnInit() {
    this.getids();
  }
  adID='';
  rcnumber='';

  getids(){
      this.http.getIDS().subscribe((res:any)=>{
        console.log(res);
        if(res.length>0){
          this.rcnumber=res[0]['receiptNumber'];
          this.adID=res[0]['admissionId'];
        }

      },(err)=>{
        this.toast.errorstatus0();
        console.log(err);
      })
  }

  addAdmisionid(){
      this.http.addUpdadmissionid(this.adID).subscribe((res)=>{
        console.log(res);
        this.toast.successcustomhead(res['msg'],"Admission ID");
      },(err)=>{
        this.toast.errorstatus0();
        console.log(err);
      })
  }


  addReceiptNumber(){
    this.http.addupdReceiptNumber(this.rcnumber).subscribe((res)=>{
      console.log(res);
      this.toast.successcustomhead(res['msg'],"Receipt Number");
    },(err)=>{
      this.toast.errorstatus0();
      console.log(err);
    })
  }


}
