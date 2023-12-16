import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/admin/models/product';
import { ProductService } from 'src/app/admin/services/product.service';
import { LoginService } from 'src/app/services/login.service';
import { ViewbagService } from '../../services/viewbag.service';
import { ProductlistService } from '../../services/productlist.service';
import { Addproducttolist } from '../../models/addproducttolist';
import { Productlist } from '../../models/productlist';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addproducttolist',
  templateUrl: './addproducttolist.component.html',
  styleUrls: ['./addproducttolist.component.css']
})
export class AddproducttolistComponent implements OnInit {

  userId:number=0;
  productList:Product[]=[]
  listId:number=0;
  addProductList:any|undefined;
  myShoppingList:Productlist[]=[];


  

  constructor(
    private loginService:LoginService,
    private productService:ProductService,
    private router:Router,
    private viewbag:ViewbagService,
    private productListService:ProductlistService,
     
    ) {
   
    
  }
  ngOnInit(): void {
    this.userId = parseInt(this.loginService.getTokenUserId(),10);
    this.listId=this.viewbag.sharedData as number;
    this.loadProduct();
    this.loadShoppingList();
    console.log("bu hangi id:"+this.viewbag.sharedData);
    
    this.addProductList={
      productId:0,
    listId:0,
    status:true
    }
    
    
    
  }


  loadProduct(){

    this.productService.getAll().subscribe({

      next:(x)=>{
        this.productList=x.sort((a, b) => a.name.localeCompare(b.name));
        
      },
      error:(e:any)=>{
        if(e.status==404){
          alert('Sistemde henuz bir ürün eklenmemiş.Admin işini yapsa şu an burası ürünle dolardı.');
          this.router.navigateByUrl('/ui')
        }
      },
      complete:()=>{
     
      }
      
    })
     
  }

  loadShoppingList(){
    this.productListService.getAll(this.listId).subscribe({
      next:(x)=>{this.myShoppingList=x;
      console.log("listid değerim:"+this.listId);
      console.log(x);
      
      
      },
      error:(e:any)=>{
        if(e.status==404){
          this.myShoppingList=[];
          alert('Listeniz şu an boş, lütfen ürün ekleyiniz');
          
        }
      },
      complete:()=>{}

    })


  }

  add(id:number){
    
    

    this.addProductList.productId=id;
    this.addProductList.listId=this.viewbag.sharedData;
    this.addProductList.status=true;
    this.productListService.add(this.addProductList).subscribe({
      next:(x)=>{console.log(x)},
      error:(e:any)=>{

      },
      complete:()=>{
        this.loadShoppingList();
      }
      
      
        
      });
    

  }

  delete(id:number){
    this.productListService.delete(id).subscribe({
      next:(x)=>{ 
        

      },
      error:(e:any)=>{
        if(e.status==404){
          
          
        }

      },
      complete:()=>{
        this.loadShoppingList();
        
        
      }
    })
  }

  updateList(id:number,description:string){


this.productListService.setData(description,id);
this.router.navigateByUrl('/ui/lists/updateshoppinglist')



  }


  

}