import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private routing:Router,private toastr: ToastrService, private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
  }
  onSubmit(){
    this. submitted = true;
    console.log(this.loginForm.value.username)
   
    this.authservice.loginuser(this.loginForm.value).subscribe((res : any)=>{
      console.log(res.status);

      if(res.status==1){
        this.toastr.error("User not found")
        this.routing.navigate([''])
      }else{
        if(res.status==0){
          this.toastr.error("Password is wrong")
      }else{
        localStorage.setItem('token', res.token)
        this.routing.navigate(['/employees'])
        this.toastr.success("user login successfully")
      }
    }
   })
  }
  onSubmitpass(){

    console.log("..........",this.loginForm.value)
    this.authservice.forgotpass(this.loginForm.value).subscribe((res : any)=>{
        console.log("user successfully sent email");
        Swal.fire({
          title: 'Send!!!!!!',
          text: 'Do you want to continue',
          confirmButtonText: 'Cool'
        })
            // this.routing.navigate(['/employees'])

            

    })

  }
  close(): void {
  
    this.modalRef.hide();
  }
}


