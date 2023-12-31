import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

productList:Product[]=[]
nameValid:string='';


constructor(private productService:ProductService,private router:Router) {
  
  
}
  
  ngOnInit(): void {
    
    this.load();
  }

  load(){

    this.productService.getAll().subscribe({

      next:(x)=>{
        this.productList=x.sort((a, b) => a.name.localeCompare(b.name));
        
      },
      error:(e:any)=>{
        if(e.status==404){
          alert('Hiç ürün eklenmediği için ekleme sayfasına yönlendirileceksiniz');
        this.router.navigateByUrl('/admin/product/addproduct')
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
    this.productService.delete(id).subscribe({
      next:(x)=>{ console.log(x.body);
        console.log(x.headers);
        
      },
      error:(e:any)=>{
        if(e.status==500){
          alert('Sunucuya erişilemiyor');
        }
        if(e.status==404) { 
          alert('Ürün bulunamadı');
        }

      },
      complete:()=>{
        alert('Ürün silindi');
        this.load();
      }

    })
  }
}
    


}
