import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categoryList:Category[]=[];

  nameValid:string='';

  constructor(private categoryService:CategoryService,private router:Router) {
    
    
  }
  
  ngOnInit(): void {

    this.load();
    
  }

  load(){
    this.categoryService.getAll().subscribe({
      next:(x)=>{
        this.categoryList=x.sort((a, b) => a.name.localeCompare(b.name));
        
      },
      error:(e:any)=>{
        if(e.status==404){
          alert('Hiç kategori eklenmediği için ekleme sayfasına yönlendirileceksiniz');
        this.router.navigateByUrl('/admin/category/addcategory')

        }

      },
      complete:()=>{
        
       
      }
      


    })
      
      
      
  }

  delete(id:number){
    const isConfirmed = window.confirm('Silmek istediğinize emin misiniz?');
    // Kullanıcı "Evet" derse işlemi devam ettir
  if (isConfirmed) {


    this.categoryService.delete(id).subscribe({
      next:(x)=>{ console.log(x.body);
        console.log(x.headers);
        
      },
      error:(e:any)=>{
        if(e.status==400){
          console.log(e);
                    this.nameValid = e.error.errors.Name != null ? e.error.errors.Name[0] : '';
        }
        if(e.status==404) { 
          alert('Kategoriye ait ürün olduğu için silme işlemi yapılamadı');
        }

      },
      complete:()=>{
        alert('Kategori silindi');
        this.load();
      }

    })
  }
}

}
