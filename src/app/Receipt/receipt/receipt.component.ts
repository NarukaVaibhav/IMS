import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/apidata.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
result = [];
public results = [];
day1;
day2;
date1;
date2;
month1;
month2;
year1;
year2;
input:string="";

printDetail : boolean =false;
rec_details : boolean =true;

prints=[];
  constructor(public service: ApiDataService) {
  }
  ngOnInit() {
  }

  receipt(){
    this.service.getreceipt().subscribe((data) => {
        for(let key in data["results"]){
        this.result.push(data["results"][key])
      }
    });
  }

  selectDate1(event: any ){
    this.date1 = new Date(event.target.value).getDate();
    this.month1 = new Date(event.target.value).getMonth();
    this.year1 = new Date(event.target.value).getFullYear();
   }

  selectDate2(event: any ){
   this.date2 = new Date(event.target.value).getDate();
   this.month2 = new Date(event.target.value).getMonth();
   this.year2 = new Date(event.target.value).getFullYear();
   }

  showData(){
    let localDate;
    this.service.getreceipt().subscribe((data) => {
        for(let key in data["results"]){
          localDate = (data['results'][key]['dateOfRegistration']);
               const date = new Date(localDate).getDate();
               const month = Number(localDate);
               const year = Number(localDate);
               if( (date >= this.date1  && month >= this.month1  && year >= this.year1 ) ) {
                 if((month<this.month2 && year<=this.year2 ) || (month==this.month2 && date <= this.date2 && year<=this.year2)){
                   this.result.push(data['results'][key])
                  }
                }
              }
           })
       }

    
      print(res){

        this.prints.push(res);
        this.rec_details=false
        this.printDetail=true

      }

      print_receipt(){
        window.print();
      }
      cancel(){
        this.result=[]
        this.rec_details=true
        this.printDetail=false
        this.receipt();
      }
  }
