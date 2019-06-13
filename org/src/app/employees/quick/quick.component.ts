import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl ,FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.scss']
})
export class QuickComponent implements OnInit {
  fileData: File = null;
  techskills = []
  employeeForm: FormGroup;
  submitted = false;
  public formData = new FormData();  
  constructor(private formBuilder:FormBuilder, private routing:Router,private employeeservice: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      id: [''],
   fname: ['', Validators.required],
   lname: ['', Validators.required],
   email: ['', [Validators.required, Validators.email]],
   productImage: ['']
  })
 
}

onSubmit(){
   console.log(this.employeeForm.value)
  this.formData.append('productImage', this.fileData );
  const emp = {
    'fname' : this.employeeForm.value.fname,
    'lname' : this.employeeForm.value.lname,
    'email' : this.employeeForm.value.email,
    'mobno': this.employeeForm.value.mobno,
    'dob': this.employeeForm.value.dob,
    'address': this.employeeForm.value.address,
    'city': this.employeeForm.value.city,
    'state': this.employeeForm.value.state,
    'zip': this.employeeForm.value.zip,
    'gender': this.employeeForm.value.gender,
    'techskill': this.techskills,
    'salary': this.employeeForm.value.salary,
    'hobbiesPreferences': this.employeeForm.value.hobbiesPreferences,
    'productImage': this.employeeForm.value.productImage
    
  }

  Object.entries(emp).forEach(
    ([key, value]: any[]) => {
     
      this.formData.append(key, value);
    });
  console.log("-----------------",this.formData)
  
this.submitted = true;
console.log("---------------------------------", this.employeeForm.value.fname);
    this.employeeservice.setemployee(this.formData).subscribe((res : any)=>{
      console.log("///////////",res);
})


this.routing.navigate(['/', 'employees']);
alert('SUCCESS!! :-)')

  }
  onFileChange(event){
   
    this.fileData =event.target.files[0];
    console.log(event.target.files[0]);
}
}

