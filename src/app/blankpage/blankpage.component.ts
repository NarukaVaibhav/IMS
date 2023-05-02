import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-blankpage',
  templateUrl: './blankpage.component.html',
  styleUrls: ['./blankpage.component.css']
})
export class BlankpageComponent implements OnInit {

  constructor(private batchTenant : ExamService) { }

  ngOnInit() {
    /// Batches Tenant Store in Local Storage
    this.batchTenant.allAssignedBatches().subscribe(
      res=>{
        console.log("BATCH",res)
        let batch=''
        let n = res["results"].length-1;
        for(let i=0;i<res["results"].length;i++)
        {
          batch+=res["results"][i].id;
          
          if(i<n)
          {
            
            batch+=',';
          }
         
        }
        localStorage.setItem('allAssignedBatches',batch)
      })
      ///////////////////End-------------------
  }

}
