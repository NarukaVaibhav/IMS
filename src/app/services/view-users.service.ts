import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ViewUsersService {

  url = this.urlimport.getURL();


  row_obj233 = []
  row_obj=[]
  constructor(private http: HttpClient, public urlimport:UrlService) { }

  private fromDashboard = false;

  getRouteStatus(){
    return this.fromDashboard;
  }

  setRouteStatus(status){
    this.fromDashboard = status;
  }


  AllUsersData:any=[];
  pagesize:any=1;

  SeacrhUser(key){
    let params:HttpParams=new HttpParams().set("data",key);
    return this.http.get(this.urlimport.getURL()+'/usersearch',{params});
  }

  /*****************************For Getting details of all the USERS***************************************/



  getTableData(pno,size){
    var link = `${this.urlimport.getURL()}/user`;
    if(this.fromDashboard){
      link = `${this.urlimport.getURL()}/user?designation=Teacher`;
    }

let params:HttpParams=new HttpParams().set("pageNo",pno).append("size",size);
    return this.http.get(link,{params}).pipe(
      catchError(this.handleError)
      );
  }




  /*****************************For Getting details of a particular USER***************************************/


  editUser($key){
    const id = $key['id']
    return this.http.get(`${this.urlimport.getURL()}/user?id=${id}`).pipe(
      catchError(this.handleError)
      );
  }




  /*****************************For deleting a particular USER***************************************/



  deleteUser($key){
    const id = $key['id']
    return this.http.delete(`${this.urlimport.getURL()}/user/${id}`).pipe(
      catchError(this.handleError)
      );
  }




  /*****************************For Updating details of a particular USER***************************************/


  updateUser(key){

    return this.http.put(`${this.urlimport.getURL()}/user`,key)

  }



  /*****************************Function for handling error that may occur during calling any API***************************************/


  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return;
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
    return;
  }
}
