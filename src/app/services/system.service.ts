import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { UrlService } from './url.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SystemService {

  url = this.urlimport.getURL();
  url1= this.urlimport.getLoginURL()
  nav : boolean
  show : boolean




  constructor(private http : HttpClient, public urlimport:UrlService) { }


  /*****************************For Updating Tenant Configuration/Information***************************************/


  updateTenant(obj){

    return this.http.put<any>(`${this.url1}/tenant`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For getting all the active IMS Courses/ Skill Bharat Courses***************************************/


  getIMSCourses(){
    return this.http.get<any>(`${this.urlimport.getURL()}/lms/courses?status=Active`).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For getting all the active Courses***************************************/


  getCourses(){
    return this.http.get<any>(`${this.urlimport.getURL()}/course?status=Active`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For mapping Skill Bharat Courses with Other Active Courses***************************************/


  mapCourses(obj){
    return this.http.post<any>(`${this.urlimport.getURL()}/course`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************Function for handling error that may occur during calling any API***************************************/



  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      console.log(error)
      console.log(error.error)
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return;

    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
    return;
  }
}
