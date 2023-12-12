import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-layoutadmin',
  templateUrl: './layoutadmin.component.html',
  styleUrls: ['./layoutadmin.component.css']
})
export class LayoutadminComponent {

  constructor(private loginService:LoginService,private router:Router) {
    
    
  }

  exit():void{
this.loginService.logout();
this.router.navigateByUrl('/login')
  }
}
