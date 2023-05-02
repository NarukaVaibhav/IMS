import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toast:ToastrService) {
    this.toast.toastrConfig.maxOpened=2;
    this.toast.toastrConfig.timeOut=2000;
   }
  
  
   successfixhead(msg){
    this.toast.success(msg,"Success!");
  }
  successcustomhead(msg,head){
    this.toast.success(msg,head);
  }

  errorfixhead(msg){
    this.toast.error(msg,"error!");
  }
  errorcustomhead(msg,head){
    this.toast.error(msg,head);
  }

  errorstatus0(){
    this.toast.error("Something went wrong...","Check Internet");
  }


  warningfixhead(msg){
    this.toast.warning(msg,"warning!",{timeOut:3000});
  }
  warningcustomhead(msg,head){
    this.toast.warning(msg,head,{timeOut:3000});
  }

  infofixhead(msg){
    this.toast.info(msg,"info!");
  }
  infocustomhead(msg,head){
    this.toast.info(msg,head);
  }
  warningcustomheadAndTimeout(msg,head,timeout){
    this.toast.warning(msg,head,{timeOut:timeout});
  }
}
