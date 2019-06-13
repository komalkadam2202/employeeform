import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {passValidator} from '../validator/validator'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;

  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private routing:Router) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.minLength(4)], 
      password: ['', Validators.required],
      cfpassword: ['', passValidator],
      

    })

  }
  onSubmit(){
    this. submitted = true;
    console.log(this.registerForm.value.username)
    this.authservice.registeruser(this.registerForm.value).subscribe((res : any)=>{
          
    })
    alert('SUCCESS!! :-)')
    this.routing.navigate(['/'])
  }


}
