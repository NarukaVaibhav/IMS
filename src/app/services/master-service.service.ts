import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {




  constructor(private http : HttpClient, public urlimport:UrlService) {}

  url = this.urlimport.getURL();



  //Admisand receipt master

  getIDS(){
    return this.http.get(this.urlimport.getURL()+'/master/getId');
  }

  addUpdadmissionid(id) {
    return this.http.post(this.urlimport.getURL() + '/master/updateAdmissionId',{"id":id});
  }

  addupdReceiptNumber(id){
    return this.http.post(this.urlimport.getURL() + '/master/addReceiptNumber',{"id":id});
  }
  /*****************************For Adding/Creating a new Designation for the Organization***************************************/


  createDesignation(designation){
    return this.http.post<any>(`${this.urlimport.getURL()}/designation`,designation).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For getting all the existing Designations of the Organization***************************************/

  getDesignations(){
    return this.http.get<any>(`${this.urlimport.getURL()}/designation`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For Updating an existing Designation of the Organization***************************************/


  updateDesignations(obj){
    return this.http.put<any>(`${this.urlimport.getURL()}/designation`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For getting all the Follow Up Modes of the Organization***************************************/

  getFolllowUps(){
    return this.http.get(`${this.urlimport.getURL()}/followUpMode`).pipe(
      catchError(this.handleError)
    );

  }



  /*****************************For Adding/Creating a new Follow Up Mode***************************************/


  putFolllowUps($key){
    return this.http.post<any>(`${this.urlimport.getURL()}/followUpMode`,$key).pipe(
      catchError(this.handleError)
    );

  }


  /*****************************For Updating an existing Follow Up Mode***************************************/


  updateFolllowUps($key){
    const id = $key['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/followUpMode/${id}`,$key).pipe(
      catchError(this.handleError)
    );

  }



  /*****************************For Deleting an existing Follow Up Mode***************************************/


  deleteFolllowUps($key){
    return this.http.delete<any>(`${this.urlimport.getURL()}/followUpMode/${$key}`).pipe(
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
