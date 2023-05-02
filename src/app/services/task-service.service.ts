import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { UrlService } from './url.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  url = this.urlimport.getURL();

  params= new HttpParams()
    .set('designation','Assistant HR Admin,Admin HR,ADMIN,Admin Entry,Teacher')
    .set('status','Active')
    .set('fieldsToSelect','id,name,emailId,designation,createdAt,status,updatedAt')



  taskDetails=[]
  projDetails=[]
  configDetails=[]

  constructor(private http : HttpClient, public urlimport:UrlService) { }


  /*****************************For Adding/Creating a Configuration for a Task***************************************/


  createTaskConfig(obj){
    return this.http.post<any>(`${this.urlimport.getURL()}/taskConfig`,obj).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For Getting details of all the Task Configurations in Table***************************************/



  getTaskConfig(){
    return this.http.get<any>(`${this.urlimport.getURL()}/taskConfig`).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For Deleting a particular Task Configuration***************************************/


  deleteTaskConfig(obj){
    const id= obj['id']
    return this.http.delete<any>(`${this.urlimport.getURL()}/taskConfig/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For Updating an existing Task Configuration***************************************/


  updateTaskConfig(obj){
    const id= obj['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/taskConfig/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For getting list of members of the organization for assigning task***************************************/


  getTeamMember(){

    return this.http.get<any>(`${this.urlimport.getURL()}/user`, {params :this.params}).pipe(
      catchError(this.handleError)
    );

  }



  /*****************************For Adding/Creating a new Project***************************************/


  createProject(obj){

    return this.http.post<any>(`${this.urlimport.getURL()}/project`,obj).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For getting details of all the Projects***************************************/



  getProject(){
    return this.http.get<any>(`${this.urlimport.getURL()}/project`).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For Updating details of an existing Project***************************************/


  updateProject(obj){
    const id= obj['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/project/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For changing the status of a Project to ACTIVE***************************************/


  activateProject(obj){
    const id= obj['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/project/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For changing the status of a Project to INACTIVE***************************************/


  deactivateProject(obj){
    const id= obj['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/project/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }


  /*****************************For deleting an existing Project***************************************/


  deleteProject(obj){
    const id= obj['id']

    return this.http.delete<any>(`${this.urlimport.getURL()}/project/${id}`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For Adding/Creating a new Task***************************************/



  createTask(obj){
    return this.http.post<any>(`${this.urlimport.getURL()}/task`,obj,).pipe(
      catchError(this.handleError)
    );
  }



  /*****************************For getting details of all the Tasks***************************************/



  getTasks(){

      return this.http.get<any>(`${this.urlimport.getURL()}/task`).pipe(
        catchError(this.handleError)
      );

  }




  /*****************************For Updating an existing Task***************************************/


  updateTask(obj){
    const id= obj['id']

    return this.http.put<any>(`${this.urlimport.getURL()}/task/${id}`,obj).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For deleting a particular Task***************************************/



  deleteTask(obj){
    const id= obj['id']

    return this.http.delete<any>(`${this.urlimport.getURL()}/task/${id}`).pipe(
      catchError(this.handleError)
    );
  }




  /*****************************For getting all Active Designations of the Organization***************************************/


  getDesignation(){
      return this.http.get<any>(`${this.urlimport.getURL()}/designation?status=Active`).pipe(
        catchError(this.handleError)
      );

  }




  /*****************************Function for handling error that may occur during calling any API***************************************/


  private handleError(error: HttpErrorResponse) {
    console.log(error)
    // if (error.error instanceof ErrorEvent) {
    //   console.log(error)
    //   console.log(error.error)
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    //   return;

    // }
    // else {
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
