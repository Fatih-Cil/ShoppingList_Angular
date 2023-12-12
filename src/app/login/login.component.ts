import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  });

  emailValid:string='';
  passwordValid:string='';
  errorValid:string|undefined;

  private readonly TOKEN_KEY = 'authToken';
  tokenRole:string='';
  

  constructor(private router:Router, private loginService:LoginService) {
    
    
  }

  ngOnInit(): void {


  }


  login(){
    const helper = new JwtHelperService();

    this.loginService.auth(this.loginForm.value as Login).subscribe({

     next:(x)=> {

     const decodedToken =(helper.decodeToken(x.body as string));
      console.log(decodedToken);
      console.log(x.body);
      sessionStorage.setItem(this.TOKEN_KEY, x.body as string);

     this.tokenRole= this.loginService.getTokenRole();
      
    },
     error:(e:any)=>{
      if(e.status==404)
      {

        console.log(e);
        this.emailValid = '';
        this.passwordValid = '';
        alert("Kullanıcı adı ve şifrenizi kontrol ediniz.");
      } 


      if( e.status==400)
      {
       
        e.error=JSON.parse(e.error);
        this.emailValid = e.error.errors.Email != null ? e.error.errors.Email[0] : '';
        this.passwordValid = e.error.errors.Password != null ? e.error.errors.Password[0] : '';
        
      } 
     },
     
     complete:()=>{

      
    
    if(this.tokenRole=='User'){

      this.router.navigateByUrl('/ui')
    }
      else if(this.tokenRole=="Admin"){
        
       this.router.navigateByUrl('/admin')
      }
      else{
        alert("Token bilgisinde hata");
      }
        
      }
    });      
      
    }
  }