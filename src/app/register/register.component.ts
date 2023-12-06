import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  registerForm=new FormGroup({
    name:new FormControl(''),
    surname:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    passwordRetry:new FormControl('')

  });

   nameValid:string='';
   surNameValid:string='';
   emailValid:string='';
  passwordValid:string='';
  passwordRetryValid:string='';

  
  /**
   *
   */
  constructor(private router:Router,private loginService:LoginService) {
   
    
  }
  ngOnInit(): void {
    
  }

  register(){



    this.loginService.register(this.registerForm.value as Register).subscribe({

      next:(x)=> {
        console.log(x.body)
        console.log(x.headers);
        
      },
      error:(e:any)=>{
        
        if(e.status==400){
        console.log(e);
        
        this.nameValid = e.error.errors.Name != null ? e.error.errors.Name[0] : '';
        this.surNameValid = e.error.errors.Surname != null ? e.error.errors.Surname[0] : '';
        this.emailValid = e.error.errors.Email != null ? e.error.errors.Email[0] : '';
        this.passwordValid = e.error.errors.Password != null ? e.error.errors.Password[0] : '';
        this.passwordRetryValid = e.error.errors.PasswordRetry != null ? e.error.errors.PasswordRetry[0] : '';

        }
        if(e.status==404) { 
          this.nameValid = '';
        this.surNameValid= '';
        this.emailValid = '';
        this.passwordValid = '';
        this.passwordRetryValid =  '';
          alert('Bu mail adresi daha önce kayıt edilmiş');}
        
        
        
     
      },
      
      complete:()=>{
        alert("Kayıt başarılı");
        this.router.navigateByUrl('/login')}
    })
  }
}
