import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl ,FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StateserviceService } from '../shared/stateservice.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Validateemp } from '../validators/empvalidator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [EmployeeService]
})
export class AddEmployeeComponent implements OnInit {
  fileData: File = null;
  public statedata;
  public paramid;
  public data;
  public citydata;
  employeeForm: FormGroup;
  submitted = false;
  marked = false;
  markvalue;
  public formData = new FormData();  
  techskills=[];
  /*----------------*/
  hobbiesPreferences = [
    { id: 1, genre: 'playing' },
    { id: 2, genre: 'Dancing' },
    { id: 3, genre: 'travelling' },
    { id: 4, genre: 'Eating' }
  ];
/*----------------------------*/

  constructor(private formBuilder:FormBuilder, private routing:Router,private employeeservice: EmployeeService, private stateservice: StateserviceService, private route: ActivatedRoute,private toastr: ToastrService

) { }

  ngOnInit() {
  
     /*----------------------------*/
  const formControls = this.hobbiesPreferences.map(control => new FormControl(false));
  
  /*----------------------------*/
 
    this.statedata = this.stateservice.state_arr;
    this.employeeForm = this.formBuilder.group({
           id: [''],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobno: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        dob: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^[0-9]\d{5}$/)]],
        gender: ['', Validators.required],
        techskill: ['', [Validators.required,Validateemp.skillvali]],
        salary: ['', Validators.required],
        hobbiesPreferences: new FormArray(formControls,Validateemp.hobbiesvali),
        image: ['']
      })
}



onSkill(skillval){
  const skillvalue = skillval.display;
  this.techskills.push(skillvalue);
  console.log("--------------------------------",this.techskills);
  
}

  
 
 toggleVisibility(e,values){  

  this.marked = e.target.checked;
  this.markvalue = e.target.value;
  
  console.log(values+"-----"+this.markvalue)
  if (this.marked){
    console.log("true");
  }else{
    console.log("false");
  }
}
  
  get f(){
    return this.employeeForm.controls; 
  }

  onclick(event){
    const val = event.target.value;
    this.citydata = this.stateservice.statearr[val];
  }

  onSubmit(){
  
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
    
    // // stop here if form is invalid
    // if (this.employeeForm.invalid) {
    //     return;
    // }
   
      
      console.log("got id");
      this.employeeForm.value.techskill = this.techskills;
     
    console.log("------------------------",this.employeeForm.value.techskill)
      this.employeeservice.setemployee(this.formData).subscribe((res : any)=>{
          
  })

  alert('SUCCESS!! :-)')
  this.toastr.success("Form submitted successfully.")
  
  }
  onFileChange(event){
    const reader = new FileReader();
    this.fileData = <File>event.target.files[0];
    console.log(event.target.files[0]);
  //   this.formData.append('productImage', event.target.files[0]);
  //   if (event.target.files && event.target.files[0]) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  
  //     reader.onload = () => {
  //       this.formData.patchValue({
       
  //      });
  //   }
  // }
}
}
  
 

