import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddNewHTTPService } from '../../services/add-new-http.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ToasterService } from '../../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

export interface topicTable {
  isFree;
  order;
  demo;
  Topic:string;
  Chapter:string;
  id:string;
  content:string;
  Status:string;
  Course:string;
  Subject:string;
  SubCourse:string;
  tenant:string;
  createdAt:string;
  updatedAt:string;
  isParent;
}


@Component({
  selector: 'app-course-mgmt-topic',
  templateUrl: './course-mgmt-topic.component.html',
  styleUrls: ['./course-mgmt-topic.component.css']
})
export class CourseMgmtTopicComponent implements OnInit {

  
  statusNAME = "Deactivate";


  // if true; will open the edit card
  editable;
  addEditable;
  editRow;
  statusMove;
  viewVisible;

  topicList;

  // courses
  selectedCourse;
  courseName;
  
  // Subjects
  subjectName;
  selectedSubject;

  // chapter
  chapterName;
  selectedChapter;

  topicName;

  topicSeq;
  
  topicContent;

  availableDemo = false;
  idString;
  courseData;

  tableData: topicTable[] = [];

  displayedColumns: string[] = ['Topic','Chapter','Subject','SubCourse','Course','Status', "Action"];
  dataSource = new MatTableDataSource<topicTable>(this.tableData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private toast:ToasterService, public httpServe:AddNewHTTPService) { }

  ngOnInit() {


    this.httpServe.getBatchData().subscribe(responseTable=>{
      var idList = [];

      // Create 25 entries
      for(let i = 0; i < responseTable["results"].length; i++ ){
        idList.push(responseTable["results"][i]['meta']['course']["id"]);
      }

      this.idString = idList.join(',');

      this.httpServe.getCourseTable(this.idString).subscribe(responseTable=>{
      
        this.courseData = responseTable["results"];

        for(let i = 0; i < responseTable["results"].length; i++ ){
          idList.push(responseTable["results"][i]["id"]);
        }
  
          this.idString = idList.join(',');

          this.httpServe.getTopics(this.idString).subscribe(response=>{
      
            this.topicList = response["results"];
      
      
            for(let i = 0; i < this.topicList.length; i++ ){
              this.tableData.push(this.createNewEntry(i));
            }
      
            this.dataSource = new MatTableDataSource(this.tableData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, err=>{
            this.toast.errorstatus0();
          })

        }, err=>{
          this.toast.errorstatus0();
        })
    }, err=>{
      this.toast.errorstatus0();
    })


    this.httpServe.getCourse().subscribe(data=>{
      this.courseName = data["results"];
    }, err=>{
      this.toast.errorstatus0();
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewEntry(index: number): topicTable  {

    // create a row for mat table
    return {
      'demo': this.topicList[index]["isDemo"],
      'isFree': this.topicList[index]["isFree"],
      'order':this.topicList[index]["order"],
      'Topic':this.topicList[index]["name"],
      'Chapter':this.topicList[index]["chapter"],
      'id': this.topicList[index]["id"],
      'Status': this.topicList[index]["status"],
      'Course':this.topicList[index]["course"],
      'content':this.topicList[index]["content"],
      'Subject':this.topicList[index]["subject"],
      'SubCourse':this.topicList[index]["subcourse"]?this.topicList[index]["subcourse"]["name"]:"N/A",
      'tenant':this.topicList[index]["tenant"],
      'createdAt':this.topicList[index]["createdAt"],
      'updatedAt':this.topicList[index]["updatedAt"],
      'isParent':this.topicList[index]["parent"]
    }
  }

  openAddTopic(){
    this.addEditable = "true";
  }

  closeDialog(){
    this.addEditable = "false";
    this.editable = "false";
    this.selectedCourse = undefined;
    this.selectedSubject = undefined;
    this.selectedChapter = undefined;
    this.topicName = undefined;
    this.topicSeq = false;
  }

  selectSubject(){
    this.httpServe.getSubject(this.selectedCourse["id"], false).subscribe(response=>{
      this.subjectName = response["results"];
    }, err=>{
      this.toast.errorfixhead("Cannot fetch data");
    })
  }

  closeContent(){
    this.viewVisible = false;
  }

  selectChapter(){
    this.httpServe.getChapterForTopics(this.selectedSubject["id"]).subscribe(response=>{
      this.chapterName = response["results"];
    }, err=>{
      this.toast.errorfixhead("Cannot fetch data");
    })
  }

  addTopic(){
    var payLoad = {"isFree":false,"course":this.selectedCourse,"subject":this.selectedSubject,"isDemo":true,"chapter":this.selectedChapter,"name":this.topicName,"order":this.topicSeq,"content":this.topicContent,"status":"Active"};

    this.httpServe.postTopic(payLoad).subscribe(response=>{
      this.toast.successfixhead("Topic added");
      this.reload()
    }, err=>{
      this.toast.errorfixhead("something went wrong");
    })
  }

  
  editTopic(){

    this.httpServe.updateTopic(
      {"isFree":this.editRow["isFree"],"course":this.selectedCourse,"subject":this.selectedSubject,"isDemo":this.editRow["demo"],"chapter":this.editRow["Chapter"],"name":this.topicName,"order":this.topicSeq,"content":this.topicContent,"status":this.editRow["Status"],"tenant":this.editRow["tenant"],"createdAt":this.editRow["createdAt"],"updatedAt":this.editRow["updatedAt"],"id":this.editRow["id"],"parent":this.editRow["isParent"]}      
    ).subscribe(response=>{
      this.toast.successfixhead("Topic updated");
      this.reload()
    }, err=>{
      this.toast.errorfixhead("something went wrong");
    })
  }

  eventAction(row, action){
    if(action == "edit"){
      this.selectedCourse = row["Course"];
      this.selectedSubject = row["Subject"];
      this.selectedChapter = row["Chapter"];
      this.topicName = row["Topic"];
      this.topicSeq = row["order"];
      this.availableDemo = row["isDemo"];
      this.topicContent = row["content"];
      this.editable="true";
      this.editRow = row;
    }
    else if(action == "delete"){

      const message = `Are you sure you want to do delete?`;
 
      const dialogData = new ConfirmDialogModel("Delete Admission?", message);
      
      const dialogRef = this.dialog.open(DialogSHOWComponent, {
        maxWidth: "400px",
        data: dialogData
      });
    
      dialogRef.afterClosed().subscribe(dialogResult => {
	      if(dialogResult == true){
          this.httpServe.deleteTopic(row["id"]).subscribe(response=>{
            this.toast.successfixhead("Topic deleted");
      
            for(let i = 0 ; i<this.dataSource.data.length; i++){
              if(this.dataSource.data[i] == row){
                this.dataSource.data.splice(i,1);
                this.dataSource._updateChangeSubscription();
              }
            }
          }, err=>{
            this.toast.errorfixhead("something went wrong");
          })
	      }
      });


    }
    else if(action == "view"){
      this.viewVisible = 'true';
      this.topicContent = row["content"].replace(/<[^>]*>/g, '');
    }
    else if(action == "setStatus"){
      // switch status
      if(row["Status"]=="Active"){
        this.statusMove = "Inactive";
        this.statusNAME = "Activate";
      }
      else if(row["Status"]=="Inactive"){
        this.statusMove = "Active";
        this.statusNAME = "Deactivate";
      }
        
        this.httpServe.deactivateTopic(
          {"isFre e":row["isFree"],"course":row["Course"],"subject":{"name":row["Subject"],"id":row["Subject"]["id"]},"chapter":row["Chapter"],"name":row["Topic"],"order":row["order"],"content":row["content"],"status":this.statusMove,"tenant":row["tenant"],"createdAt":row["createdAt"],"updatedAt":row["createdAt"],"id":row["id"]}
        ).subscribe(response=>{
          this.toast.successfixhead("Topic updated");
          this.reload()
        }, err=>{
          this.toast.errorfixhead("something went wrong");
        })
      
    }
  }

  reload(){
    this.httpServe.getTopics(this.idString).subscribe(response=>{
      
      this.tableData =[]

      this.topicList = response["results"];


      for(let i = 0; i < this.topicList.length; i++ ){
        this.tableData.push(this.createNewEntry(i));
      }

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err=>{
      this.toast.errorstatus0();
    })
  }

}
