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
import { map } from 'rxjs';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-addproducttolist',
  templateUrl: './addproducttolist.component.html',
  styleUrls: ['./addproducttolist.component.css']
})
export class AddproducttolistComponent implements OnInit {

  userId: number = 0;
  productList: Product[] = []

  listId: number = 0;
  addProductList: any | undefined;
  myShoppingList: Productlist[] = [];

  search = new FormControl('');


  constructor(
    private loginService: LoginService,
    private productService: ProductService,
    private router: Router,
    private viewbag: ViewbagService,
    private productListService: ProductlistService,
    private listService: ListService,

  ) {


  }
  ngOnInit(): void {
    this.userId = parseInt(this.loginService.getTokenUserId(), 10);
    this.listId = this.viewbag.sharedData as number;

    this.loadProduct();
    this.loadShoppingList();
    console.log("bu hangi id:" + this.viewbag.sharedData);

    this.addProductList = {
      productId: 0,
      listId: 0,
      status: true
    }

    this.search.valueChanges.subscribe(x => {



      this.productService.getUserWithSearch(x as string).subscribe(y => {
        this.productList = y;

      })

    })


  }


  loadProduct() {

    this.productService.getAll().subscribe({

      next: (x) => {
        this.productList = x.sort((a, b) => a.name.localeCompare(b.name));

      },
      error: (e: any) => {
        if (e.status == 404) {
          alert('Sistemde henuz bir ürün eklenmemiş.Admin işini yapsa şu an burası ürünle dolardı.');
          this.router.navigateByUrl('/ui')
        }
      },
      complete: () => {

      }

    })

  }

  loadShoppingList() {
    this.productListService.getAll(this.listId).subscribe({
      next: (x) => {
        this.myShoppingList = x;
        console.log("listid değerim:" + this.listId);
        console.log(x);


      },
      error: (e: any) => {
        if (e.status == 404) {
          this.myShoppingList = [];
          alert('Listeniz şu an boş, lütfen ürün ekleyiniz');

        }
      },
      complete: () => { }

    })


  }

  add(id: number) {

    let istrue = this.myShoppingList.some(item => item.productId == id)


    if (!istrue) {

      this.addProductList.productId = id;
      this.addProductList.listId = this.viewbag.sharedData;
      this.addProductList.status = true;
      this.productListService.add(this.addProductList).subscribe({
        next: (x) => { console.log(x) },
        error: (e: any) => {

        },
        complete: () => {
          this.loadShoppingList();
        }

      });
    }
    else {
      alert("Bu ürün listenizde var")

    }

  }




  delete(id: number) {
    this.productListService.delete(id).subscribe({
      next: (x) => {

      },
      error: (e: any) => {
        if (e.status == 404) {


        }

      },
      complete: () => {
        this.loadShoppingList();


      }
    })
  }

  updateList(id: number, description: string) {


    this.productListService.setData(description, id);
    this.router.navigateByUrl('/ui/lists/updateshoppinglist')



  }



  shoppingGo(mylistid: number) {

    this.listService.getList(mylistid).subscribe({
      next: (x) => {
        console.log("çağrılan değer:" + x.id + "-" + x.userId + "-" + x.name + "-" + x.status);

        const updatedList: List = {
          id: x.id,
          userId: x.userId,
          name: x.name,
          status: false,
        };
        console.log("Değişen değer:" + updatedList.id + "-" + updatedList.userId + "-" + updatedList.name + "-" + updatedList.status);

        this.listService.updateListStatus(updatedList).subscribe({
          next: (y) => { this.router.navigateByUrl('/ui/lists/mylistview') },
          error: (e: any) => {
            console.log(e);
          },
          complete: () => { }
        })
      },
      error: (e: any) => { },
      complete: () => {



      }
    })
  }



}
