import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {passValidator} from '../validator/validator'

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {
  submitted = false;
  resetForm: FormGroup;
  public paramid;
  @Input() childMessage: string;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private routing:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.resetForm = this.formbuilder.group({
        password: ['', Validators.required],
        cfpassword: ['', passValidator],
    })
    
    this.paramid = this.route.snapshot.params['id'];
    // this.getdataid(this.route.snapshot.params['id']);
      console.log("/-----------------------/",this.paramid);


  }


onSubmit(){
console.log("i am innnnnnnnnnnnnnnnnnnn")
  console.log("*********************",this.resetForm.value)
  this.authservice.resetpass(this.paramid,this.resetForm.value).subscribe((res : any)=>{

    this.authservice.resendemail(this.paramid).subscribe((res : any)=>{

         console.log(res)
  
    })     
    
    console.log(res)

  })     

}


  
}
