import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {



  constructor(private http: HttpClient, private urlImport: UrlService) {}

  url = this.urlImport.getURL();
  loc_url = this.urlImport.location_url;



  /*****************************For getting the list of DESIGNATIONS of the organization***************************************/


   getDesignations(){

    return this.http.get(`${this.urlImport.getURL()}/designation`).pipe(
      catchError(this.handleError)
      );
  }



  /*****************************For getting the list of COUNTRIES***************************************/


  getCountries(){
    return this.http.get(`${this.loc_url}/locationmaster/countries`).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For getting the list of STATES according to the selected COUNTRY***************************************/


  getStates(countryID : number){
    return this.http.get(`${this.loc_url}/locationmaster/states/${countryID}`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For getting the list of CITIES according to the selected STATE***************************************/


  getCities(stateID : number){
    return this.http.get( `${this.loc_url}/locationmaster/cities/${stateID}`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For Adding/Creating a record of an User***************************************/


  addUser(user : object){
    return this.http.post<any>(`${this.urlImport.getURL()}/user`,user).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************Function for handling error that may occur during calling any API***************************************/

  private handleError(error: HttpErrorResponse) {
    console.log(error)


    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return;

    }
        return throwError('Something bad happened. Please try again later.');
    return;
  }
}
