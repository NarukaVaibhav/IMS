import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class EnquiryServiceService {



  EnquiryDetails = []
  EnqSummary = []

  constructor(private http : HttpClient, public urlimport:UrlService) {}

  url = this.urlimport.getURL();



  /*****************************For Adding/Creating a record of an Enquiry***************************************/

  createEnquiry(enquiry_obj){
    return this.http.post<any>(`${this.urlimport.getURL()}/enquiry`,enquiry_obj).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For Getting list of courses***************************************/


  getCourses(){
    return this.http.get<any>(`${this.urlimport.getURL()}/course?status=Active`).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For Getting all the Enquiries in table***************************************/



  getEnquiryDetails(){
    return this.http.get<any>(`${this.urlimport.getURL()}/enquiry`).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For Adding Follow Up Mode for an Enquiry record***************************************/



  addFollowUp(obj){
    const id = obj['id']
    return this.http.put<any>(`${this.urlimport.getURL()}/enquiry/${id}`,obj)


  }





  /*****************************For Changing the status of an enquiry to ARCHIVED***************************************/

  statusArchived(obj){
    const id = obj['id']
    return this.http.put(`${this.urlimport.getURL()}/enquiry/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For Changing the status of an enquiry to UNARCHIVED***************************************/


  statusUnarchived(obj){
    const id = obj['id']
    return this.http.put(`${this.urlimport.getURL()}/enquiry/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For changing the status of an enquiry to CONVERTED***************************************/


  statusConverted(obj){
    const id = obj['id']
    return this.http.put(`${this.urlimport.getURL()}/enquiry/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For Adding an converted Enquiry as addmission***************************************/


  createAdmission(admission_obj){
    return this.http.post<any>(`${this.urlimport.getURL()}/admission`,admission_obj).pipe(
      catchError(this.handleError)
    );

  }



  /*****************************For Updating an Enquiry***************************************/

  updateEnq(obj){
    const id = obj['id']
    return this.http.put<any>(`${this.urlimport.getURL()}/enquiry/${id}`,obj)
  }





  /*****************************For Deleting an Enquiry***************************************/

  deleteEnq(obj){
    const id = obj['id']
    return this.http.delete<any>(`${this.urlimport.getURL()}/enquiry/${id}`).pipe(
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
    //  else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    //   return;
    // }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
    return;
  }

}
