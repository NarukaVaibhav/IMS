import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddNewHTTPService } from '../../services/add-new-http.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';


export interface examTable {
  Question
  Section
  Level
  Type
  CorrectAnswer
  StudentAnswer
  Marks
  ObtainedMarks

}




@Component({
  selector: 'app-individual-results',
  templateUrl: './individual-results.component.html',
  styleUrls: ['./individual-results.component.css']
})
export class IndividualResultsComponent implements OnInit {
  
  resultData;
  studentData;

  examData:examTable[] = [];

  displayedColumns: string[] = ['Question', 'Section', 'Level', 'Type','Correct Answer','Student Answer','Marks','Obtained Marks'];
  dataSource = new MatTableDataSource<examTable>(this.examData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  studentName: any;
  studentMOB: any;
  studentEmail: any;
  


  constructor(public httpServe:AddNewHTTPService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    var data = this.httpServe.getExamData();
    
    this.studentData = data[1];
    this.resultData = data[0][0];

    this.studentMOB = this.studentData[0]['basicDetails']['mobileNumber'];
    this.studentEmail = this.studentData[0]['basicDetails']['emailID'];
    this.studentName = this.studentData[0]['basicDetails']['studentName'];
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
