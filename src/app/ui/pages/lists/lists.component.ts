import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Router } from '@angular/router';
import { List } from '../../models/list';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

list:List[]=[];
  userId:number=0;
constructor(private listService:ListService,private router:Router,private loginService:LoginService) {
  
  
}

  ngOnInit(): void {
    this.userId = parseInt(this.loginService.getTokenUserId(),10);
    this.listLoad();
  
    
  }

  listLoad(){

    this.listService.getByUserId(this.userId).subscribe({

      next:(x)=>{
        console.log(x);
        console.log(this.userId)
        this.list=x;


      },
      error:(e:any)=>{
        alert(e.error);
        this.router.navigateByUrl('/ui/lists/addlist')
        

      },
      complete(){
        

      }

    })
  }

}
