import {Injectable} from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders,HttpResponse, HttpInterceptor,HttpRequest,HttpHandler,HttpSentEvent,HttpHeaderResponse,HttpProgressEvent,HttpUserEvent, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import{tap,retry, retryWhen,mergeMap,take} from 'rxjs/operators';
import {Router} from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router){

  }
  

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   req = req.clone({
  //     setHeaders: {
  //       "Authorization"  : `Bearer ${localStorage.getItem('token')}`,
  //       "x-app-version"  : "12",
  //       // "Content-Type"   : "application/json; charset=utf-8",
  //       "Accept"         : "application/json, text/plain, */*",
  //       "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8"
  //     }
  //   });

  //   return next.handle(req);
  // }
addToken(req: HttpRequest<any>): HttpRequest<any> {
  return req.clone({
        setHeaders: {
          "Authorization"  : `Bearer ${localStorage.getItem('token')}`,
          "x-app-version"  : "12",
          // "Content-Type"   : "application/json; charset=utf-8",
          "Accept"         : "application/json, text/plain, */*",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8"
        }
      });    
          
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any> | HttpEvent<any>> {
    return next.handle(this.addToken(req)).pipe(retry(1),
      tap((res)=>{
      //  this.service.loader=false;
        if(res instanceof  HttpResponse){          
          if(res.body['refereshedToken']){            
            console.log(res.body);
            localStorage.setItem("token",res.body['refereshedToken']);            
          }
        }
        
      },(err)=>{        
        if(err instanceof HttpErrorResponse){          
          if(err.statusText=='Unauthorized'){            
            // this.service.logout();
            localStorage.clear();
            this.router.navigate(['/login']);
          }
          // else{

          // }     
        }       
      })
    )
}



}