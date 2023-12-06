import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProduct } from 'src/app/admin/models/add-product';
import { CategoryDropMenu } from 'src/app/admin/models/category-drop-menu';
import { CategoryService } from 'src/app/admin/services/category.service';
import { ProductService } from 'src/app/admin/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  
    AddProductForm=new FormGroup({
    name:new FormControl(''),
    categoryid:new FormControl(0),
    urlImage:new FormControl('')
  });

  categoryMenu:CategoryDropMenu[]=[];
  nameValid:string='';
  categoryValid:string='';
  
  
  constructor(private categoryService:CategoryService, private productService:ProductService,private router:Router) {
    
    
  }
  ngOnInit(): void {

this.getCategory();
    
  }


  getCategory(){

    this.categoryService.getAll().subscribe({
      next:(x)=>{
        this.categoryMenu=x;         
        
      },
      error:(e:any)=>{

      },
      complete:()=>{}
     
    })

  }

  addProduct(){

    console.log(this.AddProductForm.value as AddProduct);

    this.productService.add(this.AddProductForm.value as AddProduct).subscribe({
      next:(x)=>{
        console.log(x.body)
        console.log(x.headers);
      },
      error:(e:any)=>{
        if(e.status==400){
          console.log(e);
          
          this.nameValid = e.error.errors.Name != null ? e.error.errors.Name[0] : '';
          this.categoryValid = e.error.errors.CategoryId != null ? e.error.errors.CategoryId[0] : '';

        }
        if(e.status==404) { 
        this.nameValid = '';
        
          alert('Bu isimde bir ürün var');
        }
    },
      complete:()=>{
        alert('Kayıt başarılı');
        this.router.navigateByUrl('/admin/product')

      }
    })
    
  }


}
