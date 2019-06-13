import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private routing:Router) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onSubmit(){
    this. submitted = true;
    console.log(this.loginForm.value.username)
    this.authservice.loginuser(this.loginForm.value).subscribe((res : any)=>{
      localStorage.setItem('token', res.token)
    
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          type: 'error',
          confirmButtonText: 'Cool'
        })
            this.routing.navigate(['/employees'])
    })
  }
}


