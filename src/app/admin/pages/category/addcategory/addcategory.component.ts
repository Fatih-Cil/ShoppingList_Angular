import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/admin/models/category';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  
  AddCategoryForm=new FormGroup({
    name:new FormControl('')
  });

  nameValid:string='';
  
  
  constructor(private categoryService:CategoryService,private router:Router) {
    
    
  }
  
  ngOnInit(): void {
    
    
  }

  addCategory(){
    this.categoryService.add(this.AddCategoryForm.value as Category).subscribe({
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
        
          alert('Bu isimde bir kategori var');}

      },
      complete:()=>{
        alert('Kayıt başarılı');
        this.router.navigateByUrl('/admin/category')}
    })
  }

}
