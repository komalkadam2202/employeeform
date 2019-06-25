// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { EmployeeService } from '../shared/employee.service';
// import { StateserviceService } from '../shared/stateservice.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-update-employee',
//   templateUrl: './update-employee.component.html',
//   styleUrls: ['./update-employee.component.scss']
// })
// export class UpdateEmployeeComponent implements OnInit {
//   public statedata;
//   public paramid;
//   public data;
//   public citydata;
//   public formData = new FormData(); 
//   fileData: File = null;
//   employeeForm: FormGroup;
//   submitted = false;
//   hobbiesPreferences = [
//     { id: 1, genre: 'playing' },
//     { id: 2, genre: 'Dancing' },
//     { id: 3, genre: 'travelling' },
//     { id: 4, genre: 'Eating' }
//   ];
//   constructor(private formBuilder:FormBuilder, private routing:Router,private employeeservice: EmployeeService, private stateservice: StateserviceService, private route: ActivatedRoute, private http:HttpClient) { }

//   ngOnInit() {
//     const formControls = this.hobbiesPreferences.map(control => new FormControl(false));
//     console.log(Object.values(this.hobbiesPreferences).length)
//     const selectAllControl = new FormControl(false);
//     this.statedata = this.stateservice.state_arr;
//     this.employeeForm = this.formBuilder.group({
//       id: [''],
//       fname: ['', Validators.required],
//       lname: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       mobno: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
//       dob: ['', Validators.required],
//       address: ['', Validators.required],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//       gender: ['', Validators.required],
//       zip: ['', [Validators.required, Validators.pattern(/^[0-9]\d{5}$/)]],
//       hobbies1: ['', Validators.required],
//       hobbies2: ['', Validators.required],
//       hobbies3: ['', Validators.required],
//       techskill: ['', Validators.required],
// 	  salary: ['', Validators.required],

//       hobbiesPreferences: new FormArray(formControls),
//         selectAll: selectAllControl
//     })
//    this.paramid = this.route.snapshot.params['id'];
//    this.getdataid(this.route.snapshot.params['id']);
//      console.log(this.paramid);
//   }

//   getdataid(id){
//     this.employeeservice.getwithid(id).subscribe((res : any)=>{
//     //  console.log(res.state);..........
//     console.log("hobbies")
//     console.log(res.hobbiesPreferences);
//     // let i;...............
//     // for(res.hobbiesPreferences[i] = 0;res.hobbiesPreferences[i] < Object.values...........(this.hobbiesPreferences).length;res.hobbiesPreferences[i]++){..............
//      var newPref=new Array;

//     //  for(var i= 0 ; i< this.hobbiesPreferences.length; i++){...............
//     //    if(res.hobbiesPreferences[i] === "true") ..............
//     //    {
//     //     newPref[i] = true;
//     //    }else{
//     //     newPref[i] = false;
//     //    }.............................
		

     
    

//       this.citydata = this.stateservice.statearr[res.state];
// 	  this.data = res;
// 	  this.fileData = this.data.productImage; 
	  
//       console.log("response")
//       console.log(newPref);
//       this.employeeForm.patchValue(res);
//       this.employeeForm.patchValue({'hobbiesPreferences':newPref});
//     })
//   }
  
//   updateData(id,data){
   
//    }
//    onclick(event){
//     const val = event.target.value;
//     this.citydata = this.stateservice.statearr[val];
//   }


//   onFileChange(event){
//     const reader = new FileReader();
//     this.fileData = <File>event.target.files[0];
//     console.log(event.target.files[0]);

// }


//   onSubmit(){
	
// 	this.formData.append('productImage', this.fileData );
//     const emp = {
//       'fname' : this.employeeForm.value.fname,
//       'lname' : this.employeeForm.value.lname,
//       'email' : this.employeeForm.value.email,
//       'mobno': this.employeeForm.value.mobno,
//       'dob': this.employeeForm.value.dob,
//       'address': this.employeeForm.value.address,
//       'city': this.employeeForm.value.city,
//       'state': this.employeeForm.value.state,
//       'zip': this.employeeForm.value.zip,
//       'gender': this.employeeForm.value.gender,
//       'techskill': this.employeeForm.value.techskill,
//       'salary': this.employeeForm.value.salary,
//       'hobbiesPreferences': this.employeeForm.value.hobbiesPreferences
//     }

//     Object.entries(emp).forEach(
//       ([key, value]: any[]) => {
       
//         this.formData.append(key, value);
//       });
//     console.log("*******************************",this.formData)
//     this.submitted = true;

    
//     alert('SUCCESS!! :-)')
//     console.log("the value is", this.employeeForm.value);
   
// 		console.log(this.paramid);
// 		this.http.put('http://localhost:3500/',this.formData).subscribe((res)=>{
// 			console.log(res);
// 		})
//     this.employeeservice.updatedata(this.formData).subscribe((res:any)=>{
//        if(res == null){
//         alert('record is not updated');
//        }
//        else{
//         alert('record is updated');
//         this.routing.navigate(['/', 'employees']);
//        }

//       });
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { StateserviceService } from '../shared/stateservice.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  public statedata;
  public paramid;
  public data;
  public citydata;
  employeeForm: FormGroup;
  public formData = new FormData(); 
  fileData: File = null;
  submitted = false;
  hobbiesPreferences = [
    { id: 1, genre: 'playing' },
    { id: 2, genre: 'Dancing' },
    { id: 3, genre: 'travelling' },
    { id: 4, genre: 'Eating' }
  ];
  techskills=[];
  tS=[];
  public datas:any;
  constructor(private formBuilder:FormBuilder, private routing:Router,private employeeservice: EmployeeService, private stateservice: StateserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    const formControls = this.hobbiesPreferences.map(control => new FormControl(false));
    console.log(Object.values(this.hobbiesPreferences).length)
    const selectAllControl = new FormControl(false);
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
      gender: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]\d{5}$/)]],
      hobbies1: ['', Validators.required],
      hobbies2: ['', Validators.required],
      hobbies3: ['', Validators.required],
      techskill: ['', Validators.required],
      salary: ['', Validators.required],
      hobbiesPreferences: new FormArray(formControls),
      productImage: [''],
    })
   this.paramid = this.route.snapshot.params['id'];
   this.getdataid(this.route.snapshot.params['id']);
     console.log(this.paramid);
     console.log("////////////",this.employeeForm.value);
  }
  
  getdataid(id){
    
    this.employeeservice.getwithid(id).subscribe((res : any)=>{
      this.employeeForm.patchValue({fname:res.fname });
      this.employeeForm.patchValue({lname: res.lname});
      this.employeeForm.patchValue({email: res.email});
    //  console.log(res.state);
   
    this.techskills = JSON.stringify(res.techskill).split(',');
     console.log("------------",this.techskills)
  
     for(var i = 0; i < this.techskills.length; i++) {
      this.tS[i] = this.techskills[i].replace(/[^a-zA-Z ]/g, "")
    }
    this.techskills = this.tS;
    console.log(res.techskill);


  console.log("hobbies***********",res.hobbiesPreferences);
  var newDef=[];
  if(res.hobbiesPreferences == "")
  {
    newDef= this.hobbiesPreferences;
    console.log("*************************", newPref);
  }else{
    console.log(  JSON.stringify(res.hobbiesPreferences[0]).split(','));
    var newPref = JSON.stringify(res.hobbiesPreferences[0]).split(',');
    // console.log("*************************", newPref);
     for(var i= 0 ; i< this.hobbiesPreferences.length; i++){
            if(newPref[i].replace(/[^a-zA-Z ]/g, "") === "true")
            {
            
             newDef[i] = true;
            
            }else{
            
             newDef[i] = false;
           
            }
         }
     console.log("-----------newDef",newDef)
    
  }
 
   

      this.citydata = this.stateservice.statearr[res.state];        
      this.data = res;
    
      // console.log(res.techskills[0]);
      this.employeeForm.patchValue({'hobbiesPreferences':newDef});
      this.employeeForm.patchValue({'techskill':this.techskills});
  
      this.employeeForm.patchValue({
                                    mobno: res.mobno,
                                    dob: res.dob,
                                    address: res.address,
                                    city: res.city,
                                    state: res.state,
                                    gender: res.gender,
                                    zip: res.zip,
                                  });
      this.employeeForm.patchValue({salary:res.salary})
      this.employeeForm.patchValue({productImage: res.productImage});
     })
  }
  
  updateData(id,data){
   
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
      'hobbiesPreferences': this.employeeForm.value.hobbiesPreferences
    }

    Object.entries(emp).forEach(
      ([key, value]: any[]) => {
       
        this.formData.append(key, value);
      });
    console.log("*******************************",this.formData)
    this.submitted = true;

    // stop here if form is invalid
    // if (this.employeeForm.invalid) {
    //   alert("invalid")
    //     return;
    // }
    alert('SUCCESS!! :-)')
    console.log("the value is")
    console.log(this.employeeForm.value)
  
    this.employeeservice.updatedata( this.paramid ,this.formData).subscribe((res:any)=>{
       if(res == null){
        alert('record is not updated');
       }
       else{
        alert('record is updated');
           this.routing.navigate(['/', 'employees']);
       }

      });
  }


  onFileChange(event){
        const reader = new FileReader();
        this.fileData = <File>event.target.files[0];
        console.log(event.target.files[0]);
    
    }

}
