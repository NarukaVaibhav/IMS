import { Component, OnInit, ViewChild } from '@angular/core';
import {PlacementdataService} from '../../services/placementdata.service';
import { Router } from '@angular/router';
import {
  MatPaginator
} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

export interface TableEntry {
  companyName : string;
  requirements : string;
  Vacancies : string ;
  Package : string;
  Status : string;
  id:string;
  
}
@Component({
  selector: 'app-viewplacement',
  templateUrl: './viewplacement.component.html',
  styleUrls: ['./viewplacement.component.css']
})
export class ViewplacementComponent implements OnInit {

  data=[];
  arr=[];
 
  public active=true;
  public inactive=false;
  companysearch="";


  companyname;
  contactno: number;
  website;
  emailid;
  address;
  selectionCriteria;
  technologies;
  selectionprocedure;
  noofstudent;
  placeofposting;
  bond;
  vacancies;
  salaryperannum;
  probationperiod;
  joiningdate;
  appraisalperiod;
  dateforofferletter;
  others;
  ngOnInit(){
this.onCall();
  }

  onCall()
  {
    this._http.getting().subscribe((result)=>{
     if(result["results"].length == 0)
     {
      this.toastr.warning('Data Not Available', 'Data Not Found', {
        timeOut: 2000
      });
     }
     else
     {
      for(let i=0;i<result["results"].length ;i++)
      {        
        this.data.push({
          sno : i+1,
          companyName :result["results"][i].name,
          requirements : result["results"][i].requirements ? result["results"][i].requirements : '-',
          vacancies : result["results"][i].noOfVacancies ? (result["results"][i].noOfVacancies ) :'-',
          Package : result["results"][i].Package == ''? '':(result["results"][i].Package ),
          status : result["results"][i].status ? result["results"][i].status : '-',
          id : result["results"][i].id
        })
      }   
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;  
     }
   

   })
  }
  constructor(public _http:PlacementdataService,private route:Router ,  public dialog: MatDialog,   private toastr: ToastrService ) {
    
 
  } 

  
  delete(row,action,index){
    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Leave!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      if(action == "delete"){
        if(result){
          this._http.delete(row["id"]).subscribe(response=>{
            
          });
          const data = this.dataSource.data;
             data.splice(index, 1);
             for(let i=0;i<data.length;i++)
             {
              data[i]['sno'] = i+1;
             }
             this.dataSource.data=data
        }
      }
  
	  }
    });



  
  
  }
 

  edit(row)
  {
    
    this.route.navigate(['/Placement/placementedit' , row.id])
  }



    activate(statusobj){
      const date=new Date();
      this.active=true;
      this.inactive=false;
      statusobj['status']="Active";
      statusobj['updatedAt']=date.toISOString();
      this._http.updatecompany(statusobj).subscribe(res=>{this.toastr.success('Update Successful', 'Active', {
        timeOut: 2000
      });})

    }


    deactivate(statusobj){
      const date=new Date();
      this.active=false;
      this.inactive=true;
      statusobj['status']="Inactive";
      statusobj['updatedAt']=date.toISOString();
      this._http.updatecompany(statusobj).subscribe(res=>{this.toastr.success('Update Successful', 'Active', {
        timeOut: 2000
      });})

    }

   
  

  sr=1
  displayedColumns: string[] = [
    'sno',
    'companyName',
    'requirements',
    'Vacancies',
    'Package',
    'Status',
    'action'
    
    
  ];
  dataSource: MatTableDataSource < TableEntry > ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

   
