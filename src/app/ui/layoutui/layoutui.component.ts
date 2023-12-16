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

    const isConfirmed = window.confirm('Çıkmak istediğinize emin misiniz?');

  // Kullanıcı "Evet" derse işlemi devam ettir
  if (isConfirmed) {
this.loginService.logout();
this.router.navigateByUrl('/login')
  }
}

}
