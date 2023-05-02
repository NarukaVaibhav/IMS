import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  Router
} from '@angular/router';
import {
  TeachersService
} from 'src/app/services/teachers.service';
import { ToastrService } from 'ngx-toastr';


export class TableEntry {
  name: string;
  email: string;
  contact: string;
  batch: string;
  cource: string;
  id: string;

}


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private service: TeachersService,
    private toastr: ToastrService,
    private route: Router) {

  }
  showAllAPi
  ngOnInit() {
    this.service.getView().subscribe(
      res => {

        this.showAllAPi = res
        for (let i in res) {
          this.dataSource.data.push({
            name: res[i].name,
            email: res[i].emailId,
            contact: res[i].contactNumber,
            batch: res[i].batch,
            cource: res[i].course,
            id: res[i].id

          })
        }
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });
      }
    )

  }
  displayedColumns: string[] = [
    'name',
    'email',
    'contact',
    'batch',
    'cource',


  ];

  dataSource = new MatTableDataSource < TableEntry > ();
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  searchKey
  onSearchClear() {

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


  nextPage(row) {
    this.route.navigate(['/teacher/show-all', row.id])
  }
}
