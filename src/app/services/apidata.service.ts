import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  public url=this.address.getURL();

  arr3=[]
  ques_ans=[]

  id= JSON.parse(localStorage.getItem('loginData'))['id']
  designation = JSON.parse(localStorage.getItem('loginData'))['designation']

  AllFeedbackData:any=[];
  pagesize:any=1;

  params= new HttpParams()
  .set('fieldsToSelect','id,feedbackTitle,feedbackFor,batch.name,batch.id,createdAt,status,updatedAt')
  .set('batchesToSelect',this.address.assignBatches())



  constructor(public httpClient:HttpClient , private address : UrlService) { }



  //  Add emp feedback

    AddStaffFeedback(obj){
        return this.httpClient.post(this.address.getURL()+'/feedback/addfeedbackstaff',obj);
    }

    updateStaffFeedback(obj){
        return this.httpClient.post(this.address.getURL()+'/feedback/updatefeedbackstaff',obj);
    }

    getStaffFeedback(empid,month,year){
        let params:HttpParams=new HttpParams().set("empid",empid).append("month",month).append("year",year);
        return this.httpClient.get(this.address.getURL()+'/feedback/getfeedbackstaff',{params});
    }





  /*****************************For Getting All the Feedback Details in Table***************************************/


  getdata(pno,size){

    if(this.designation=="Teacher"){
      return this.httpClient.get(this.address.getURL()+"/feedback", {params :this.params} );

    }
    else{
      let params:HttpParams=new HttpParams().set("pageNo",pno).append("size",size);
  return this.httpClient.get(this.address.getURL()+"/feedback/",{params});
    }
 }



  /*****************************For Getting all the Receipt Details***************************************/



 getreceipt(){
   return this.httpClient.get(`${this.address.getURL()}/receiptsearch?data=` );

 }



  /*****************************For Adding/Creating a new Feedback***************************************/



 senddata(object){
      return this.httpClient.post<any>(this.address.getURL()+"/feedback",object);
 }





  /*****************************For Getting the deatails of a particular Feedback***************************************/



 editService(id)
 {
  return this.httpClient.get<any>(`${this.address.getURL()}/feedback?id=${id}` )
 }



  /*****************************For Updating Details of a particular Feedback***************************************/


 put(object){
   const id= object['id']
   return this.httpClient.put<any>(this.address.getURL()+"/feedback/"+id,object);
 }



  /*****************************For Clonig a Feedback***************************************/

 clonedata(object){
   return this.httpClient.post<any>(this.address.getURL()+"/feedback",object);
 }



  /*****************************For Getting list of Batches***************************************/



 batchdata(){
   if(this.designation == "Teacher"){
        return this.httpClient.get(this.address.getURL()+"/batch?teacher.id="+this.id);
   }
   else{
   return this.httpClient.get(this.address.getURL()+"/batch");
  }
 }


  /*****************************For Deleting a particular Feedback***************************************/



 remove($key){
 const id= $key['id']
 return this.httpClient.delete(this.address.getURL()+"/feedback/"+id);
}


  /*****************************For Getting details of a particular Feedback***************************************/



getdatabyid($key){
  const id= $key['id']
return this.httpClient.get(this.address.getURL()+"/feedback?id="+id);
}



  /*****************************For getting list of all the users who gave Feedback for a particular batch***************************************/


getUser($key){
  return this.httpClient.get<any>(this.address.getURL()+"/user?ids="+$key+"&fieldsToSelect=name,emailId");
}






// getdatabysum(){
//   return this.httpClient.get("http://52.231.10.96:3000/app/pages/feedback/summary/partials/IndividualFeedbackInDetail.html",this.httpOptions);
// }




  /*****************************For Getting the Receipt Details according to search***************************************/



getList(input){
  return this.httpClient.get(`${this.address.getURL()}/receiptsearch?data=${input}`);
}



  /*****************************For Printing receipt***************************************/



data
printdata(res)
{
  this.data='';
  this.data = res;
}


printGetData()
{
  return this.data;
}

/************************ For Fee-REceipt Payment */
// http://52.231.91.182:9000/api/v1.0/5b0671d4272275b43c6be5bc/admissionsearch?data=

getData(input){
  return this.httpClient.get(`${this.url}/admissionsearch?data=${input}`);
}
// http://52.231.91.182:9000/api/v1.0/5b0671d4272275b43c6be5bc/admission/5e48d82c74752e59497806bf
feePayment(input)
{
  
  return this.httpClient.put(`${this.url}/admission/${input.id}` , input);
}
receiptGenerate(input)
{
  return this.httpClient.post<any>(`${this.url}/feesreceipt` , input);
}
// http://52.231.91.182:9000/api/v1.0/tenant (PUTz)
// http://52.231.91.182:9000/api/v1.0/5b0671d4272275b43c6be5bc/feesreceipt (POST)

}
