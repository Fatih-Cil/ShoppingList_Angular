import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {
  sessionUserId:number=0;
  AddListForm=new FormGroup({
    name:new FormControl(''),
    userId:new FormControl(0)
  });

  nameValid:string='';
  

  
  constructor(private listService:ListService,private router:Router,private loginService:LoginService) {
        
  }
 
  ngOnInit(): void {
   
    this.sessionUserId= parseInt(this.loginService.getTokenUserId(),10);
    console.log(this.sessionUserId);
    this.AddListForm.get('userId')?.setValue(this.sessionUserId);

  }


  addList(){

    this.listService.add(this.AddListForm.value as List).subscribe({
      next:(x)=> {
        console.log(x.body)
        console.log(x.headers);
        
      },
      error:(e:any)=>{
        if(e.status==400){
          console.log(e);
          
          this.nameValid = e.error.errors.Name != null ? e.error.errors.Name[0] : '';

        }
        if(e.status==404) { 
          this.nameValid = '';
        
          alert('Hata alındı');}

      },
      complete:()=>{
        alert('Kayıt başarılı');
        this.router.navigateByUrl('/ui/lists')}
    })

  }

}
