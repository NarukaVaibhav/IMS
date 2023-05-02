import { Component, OnInit } from '@angular/core';
import { ResetService } from '../services/reset.service';
import {
  ToastrService
} from 'ngx-toastr';
@Component({
  selector: 'app-reset-logins',
  templateUrl: './reset-logins.component.html',
  styleUrls: ['./reset-logins.component.css']
})
export class ResetLoginsComponent implements OnInit {

  showtable = false;
  str;
  email=[]

  constructor(public resetservice : ResetService,private toastr: ToastrService) { }

  search(){
    console.log(this.str)
    this.email=[]
    this.resetservice.getdata(this.str).subscribe((data) => {
      for(let key in data["results"]){
        this.email.push(data["results"][key])
      }
      if(data["results"].length==0){
        this.showtable=false;
        this.toastr.warning('No Record Found', 'No Data Available', {
          timeOut: 2000
        });
      }
      else{
        this.showtable = true;
      }

    }) 
    
  }
placeholder
  del(obj){
        
        this.resetservice.deletedata(obj).subscribe((data) => {
          
          this.toastr.success('', 'Reset Login Successfull', {
            timeOut: 2000
          });
          this.email=[];
          this.str=this.placeholder;
          this.showtable=false;
        })

  }

  ngOnInit() {
  }

}
