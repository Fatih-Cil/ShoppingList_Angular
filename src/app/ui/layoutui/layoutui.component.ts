import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-layoutui',
  templateUrl: './layoutui.component.html',
  styleUrls: ['./layoutui.component.css']
})
export class LayoutuiComponent {

  /**
   *
   */
  constructor(private loginService:LoginService,private router:Router) {
    
    
  }

  exit(){
this.loginService.logout();
this.router.navigateByUrl('/login')
  }

}
