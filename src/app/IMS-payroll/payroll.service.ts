import { Injectable } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import{UrlService} from '../services/url.service';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(public http:HttpClient,public urladd:UrlService) {

   }
  url=this.urladd.getURL();
  // ="http://192.168.1.18:9000/api/v1.0/5b0671d4272275b43c6be5bc/";



// Non api methods
  dateformatConvert(date){
    return new Date(date).getFullYear()+'-'+('0'+[(new Date(date).getMonth())+1]).slice(-2)+'-'+('0'+new Date(date).getDate()).slice(-2);
  }

  getID(){
    return JSON.parse(localStorage.getItem('loginData')).id;
  }




// api calling methods



    // Employee Module
  fetchempDetail(empname){
    let httpparams:HttpParams=new HttpParams().set("name",empname);
    return this.http.get(this.urladd.getURL()+'/employee/getemployeeinfo',{params:httpparams});
  }
  getallEmployee(){
    return this.http.get(this.urladd.getURL()+'/employee/getallemployee');
  }

  addEmployeeSaldata(data){
    return this.http.post(this.urladd.getURL()+'/employee/addemployee',data);
  }

  updateempData(data){
    // console.log(data);
    return this.http.put(this.urladd.getURL()+'/employee/updateemployee',data);
  }


  // Payroll

  getpayrollreport(){
    return this.http.get(this.urladd.getURL()+'/employee/getpayroll');
  }



  // Attendance
  markattendance(data){
    return this.http.post(this.urladd.getURL()+'/employee/markattendance',data);
  }

	updateattendance(data){
		return this.http.put(this.urladd.getURL()+'/employee/updateattendance',data);
	}



	deleteattendance(data){
		console.log(data);
		return this.http.delete(this.urladd.getURL()+'/employee/deleteattendance',data);
	}

  getattendance(data){
    let params:HttpParams=new HttpParams().set("enddate",data.enddate).append("startdate",data.startdate);
    return this.http.get(this.urladd.getURL()+'/employee/getattendance',{params});
  }

  getTeacherattendance(data){
    let params:HttpParams=new HttpParams().set("enddate",data.enddate).append("startdate",data.startdate).append("eid",data.id);
    return this.http.get(this.urladd.getURL()+'/employee/geteattendance',{params});
  }


    // Leave

  applyleave(data){
    return this.http.post(this.urladd.getURL()+'/employee/applyleave',data);
  }


  getleavesbyEmp(data){
    return this.http.post(this.urladd.getURL()+'/employee/getemployeeleaves',data);
  }


  getleavesbyadmin(data){
    return this.http.post(this.urladd.getURL()+'/employee/getleaves',data);
  }


  updateleave(data){
    return this.http.put(this.urladd.getURL()+'/employee/updateleave',data);
  }

	deleteleave(data){

		return this.http.delete(this.urladd.getURL()+'/employee/deleteleave',data);
	}


    // Holiday

    markholiday(data){
        return this.http.post(this.urladd.getURL()+'/employee/markholiday',data);
    }

    DownloadFormatfile(){
      return this.urladd.fileurl+'docs/holiday.xlsx';
    }

    uploadholidayFile(data){
      return this.http.post(this.urladd.getURL()+'/employee/uploadholiday',data);
    }

    getHolidaylist(){
      return this.http.get(this.urladd.getURL()+'/employee/getholidaylist');
    }

	deleteholiday(data){
		return this.http.delete(this.urladd.getURL()+'/employee/deleteholiday',data);
	}

    // PaySlip

    GetPaySlip(data){
      return this.http.post(this.urladd.getURL()+'/employee/getPaySlip',data);
    }



    // Constraint
    addConstraint(data){
      return this.http.post(this.urladd.getURL()+'/master/addConstraint',data);
    }

    updateConstraint(data){
      return this.http.put(this.urladd.getURL()+'/master/updateConstraint',data);
    }

    getConstraint(){
      return this.http.get(this.urladd.getURL()+'/master/getConstraint');
    }

    addPL(data){
      return this.http.post(this.urladd.getURL()+'/master/addpl',data);
    }

    getPL(){
      return this.http.get(this.urladd.getURL()+'/master/getpl');
    }

}

