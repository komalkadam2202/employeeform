import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [EmployeeService]
})
export class ListComponent implements OnInit {
  public data: any=[];
  constructor(private employeeservice: EmployeeService, private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getemployee();
}
getemployee(){
  this.employeeservice.getdata().subscribe((res:any)=>{
    console.log(res);
     this.data = res;
    });
}
  deleteData(id){
    if(confirm("Do you want to delete" )== true){;
   console.log(id);
    this.employeeservice.deletedata(id).subscribe((res:any)=>{
      // this.data = res;
      this.getemployee();
    });
   
  }
  else{
    
  }
  this.toastr.success("Form deleted successfully.")
}
}
