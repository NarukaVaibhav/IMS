import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiDataService } from '../../services/apidata.service';
import {Router} from '@angular/router'
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class TableEntry {
  feedbackName: string;
  batch: string;
  updated: string;
  type: string;
  id: string;
}

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  title;
  clone1="";
  new_results=[];
  feedback_details=[];

  public results=[];
  public rows= [];
  users=[];
  answers=[];
  status;
  rating_ques=[]
  editkey;

  feedbacksearch="";

  aa:boolean=false;





ques_ans_obj ={"user":{},"ques":[],"ans":[]}
ques_ans_obj2 ={"user":{},"ques":{},"ans":{}}



    constructor(public service: ApiDataService,
                private router : Router,
                private modalService: NgbModal,
                private toastr: ToastrService,
                private dialog :MatDialog) {
  }
  ngOnInit() {
  if(this.service.AllFeedbackData.length==0) {
    this.data(this.pno, this.psize);
    this.feedback_details = [];
    this.service.arr3 = []
    this.service.ques_ans = []
  }else{
    this.pno=this.service.pagesize;
    this.tempdata=this.service.AllFeedbackData;
    this.dataSource = new MatTableDataSource(this.service.AllFeedbackData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  }

  closeResult = '';
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  pno=1;
  psize=20;
  loading=false;
  PageEvent(e:any){
    if((e.pageIndex)==(Math.floor(e.length/e.pageSize)) || (e.pageIndex+1)==(Math.floor(e.length/e.pageSize)) || [Math.floor((e.length/e.pageSize))-1] == (e.pageIndex+1) ){
      if(!this.loading){
        // this.psize=this.psize+20;

        this.loading=true;
        this.data(this.pno,this.psize);
      }

    }
  }

  tempdata:any=[];
  data(pno,psize){
        this.service.getdata(pno,psize).subscribe((data) => {
      for(let key in data["results"]){
        this.results.push(data["results"][key])
      }
          this.pno=this.pno+1;
          this.service.pagesize=this.pno;
          if(this.tempdata.length==0) {
            this.tempdata = data['results'];
            this.service.AllFeedbackData=this.tempdata;
            this.loading = false;
            this.dataSource = new MatTableDataSource(this.results)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else{
            let temp:any=data['results'];
            for(let i=0;i<temp.length;i++){
              this.tempdata.push(temp[i]);

            }
            this.loading = false;
            this.service.AllFeedbackData=this.tempdata;
            this.dataSource = new MatTableDataSource(this.tempdata);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
      },(err)=>{this.loading=false;
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });}
    )
  }
 statusactive(object){
  const req={
    "id": object['id'],
    "status" : "Active"
  }
   this.service.put(req).subscribe(res=>{},
     err=>{
       object['status']="Inactive"
       this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
     }
   );
   object['status']="Active"
 }

 statusinactive(object){
   const req={
     "id": object['id'],
     "status" : "Inactive"
   }
    this.service.put(req).subscribe(
      res=>{},
        err=>{
          object['status']="Active"
          this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
            timeOut: 2000
          });
        }
    );
    object['status']="Inactive"
  }





 clone(object){
   this.feedback_details.push(object);
 }

 reset(){
   this.pno=1;
   this.service.pagesize=this.pno;
   this.service.AllFeedbackData=[];
   this.tempdata=[];
 }

 sendclone(){

   if(this.clone1 == ""){
    this.toastr.error('Enter New Name', 'Field is Empty', {
      timeOut: 2000
    });
   }

   else{

   this.feedback_details[0]['feedbackTitle']=this.clone1;
   this.feedback_details[0]['createdAt']=new Date();
   this.feedback_details[0]['batch']['updatedAt']=new Date();
   delete this.feedback_details[0]['id'];
   this.service.clonedata(this.feedback_details[0]).subscribe(
     res=>{
     this.results=[]
      this.reset();
     this.loading=true;
     this.data(1,this.psize);
     this.toastr.success('Feedback Cloned Successfully', 'Success', {
      timeOut: 2000
    });
     },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
     })

     this.modalService.dismissAll();


    }

 }


  edit(key){
      this.router.navigate(['/Feedback/edit-feedback' ,key.id])

  }


  remove(key){
    this.rows.splice(key,1)
  }

  delete(key){
    const message = `Are you sure you want to delete?`;

  const dialogData = new ConfirmDialogModel("Delete Feedback!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

    if(result){
    const req_payload={
                        "feedbackFor":this.results[key]['feedbacks']['feedbackFor'],
                        "feedbackTitle":this.results[key]['feedbacks']['feedbackTitle'],
                        "batch":{"name":this.results[key]['batch']['name'],
                                  "id":this.results[key]['batch']['id']},
                        "status":this.results[key]['status'],
                        "createdAt":this.results[key]['createdAt'],
                        "updatedAt":this.results[key]['updatedAt'],
                        "id":this.results[key]['id']
                      }
    this.service.remove(req_payload).subscribe(res=>{
      // this.results=[]
      // this.data();
      let temp:any=[];
      let delprocess=new Promise((resolve,reject)=>{
        for(let i=0;i<this.tempdata.length;i++){
          if(req_payload.id!=this.tempdata[i].id){
            temp.push(this.tempdata[i]);
          }
        }
        resolve();
      });
      delprocess.then(()=> {
        this.tempdata = temp;
        this.service.AllFeedbackData = this.tempdata;
        this.dataSource = new MatTableDataSource(this.tempdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toastr.success('Feedback Deleted Successfully', 'Success', {
          timeOut: 2000
        });
      });
    },
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    )


      }
    })
  }

  summary(key){

    this.service.getdatabyid(key).subscribe(res=>
    {


       if(typeof res["results"][0]["batch"]["teacher"] === "undefined" )
        {
          res["results"][0]["batch"]["teacher"] = [{name:""}];
        }
        this.service.arr3 = res["results"]





      if(Object.keys(this.service.arr3[0]['answers']).length >= 0){
      this.service.getUser(Object.keys(this.service.arr3[0]['answers'])).subscribe(res=>{
       this.users=res['results']

       for(let u in this.users){
        this.ques_ans_obj['user']=this.users[u]
        for(let q in this.service.arr3[0]['questions']){
          this.ques_ans_obj['ques'].push(this.service.arr3[0]['questions'][q])
          this.ques_ans_obj['ans'].push(this.service.arr3[0]['answers'][this.users[u]['id']][this.service.arr3[0]['questions'][q]['id']])
        }
        this.service.ques_ans.push(this.ques_ans_obj)
        this.ques_ans_obj ={"user":"","ques":[],"ans":[]}
      }
      this.router.navigate(['Feedback/feedback-summary'])
     })
    }


 
},
err=>{
  this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
    timeOut: 2000
  });
})


}



dataSource = new MatTableDataSource< TableEntry >();
feedBackName=''
displayedColumns: string[] = [
  'feedBackName',
  'batch',
  'updated',
  'type',
  'action',

];

@ViewChild(MatPaginator, {
  static: true
}) paginator: MatPaginator;
@ViewChild(MatSort, {
  static: true
}) sort: MatSort;
searchKey
onSearchClear(){

  this.searchKey = "";
  this.applyFilter();
}




// function for search bar functionality
applyFilter() {
  this.dataSource.filter = this.searchKey.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

close(){
  this.modalService.dismissAll();
}

}
