import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Router } from '@angular/router';
import { List } from '../../models/list';
import { LoginService } from 'src/app/services/login.service';
import { ViewbagService } from '../../services/viewbag.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

list:List[]=[];
  userId:number=0;
  listid:number=0;



constructor(private listService:ListService,private router:Router,private loginService:LoginService,private viewbag:ViewbagService) {
  
  
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

  delete(id:number){

    const isConfirmed = window.confirm('Listeyi silmek istediğinize emin misiniz?');

  // Kullanıcı "Evet" derse işlemi devam ettir
  if (isConfirmed) {
    this.listService.delete(id).subscribe({
      next:(x)=>{ console.log(x.body);
        console.log(x.headers);
        
      },
      error:(e:any)=>{
        if(e.status==500){
          alert('Sunucuya erişilemiyor');
        }
        if(e.status==404) { 
          alert('Hata alındı.Liste silinemedi');
        }

      },
      complete:()=>{
        alert('Liste silindi');
        this.listLoad();
      }

    });
    
  }

  }


  selectProduct(id:number){

this.viewbag.sharedData=id;
this.router.navigateByUrl('/ui/lists/addproducttolist')

    
  }

  viewList(id:number){
    
    this.viewbag.sharedData=id;
    this.router.navigateByUrl('/ui/lists/mylistview')

  }

}
