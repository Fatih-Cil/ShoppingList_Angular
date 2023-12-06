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
    


}
