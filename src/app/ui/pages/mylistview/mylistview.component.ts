import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../../services/productlist.service';
import { LoginService } from 'src/app/services/login.service';
import { ViewbagService } from '../../services/viewbag.service';
import { Productlist } from '../../models/productlist';
import { Updateproductlist } from '../../models/updateproductlist';
import { Router } from '@angular/router';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-mylistview',


  templateUrl: './mylistview.component.html',
  styleUrl: './mylistview.component.css'
})
export class MylistviewComponent implements OnInit {

  myShoppingList: Productlist[] = [];
  userId: number = 0;
  listId: number = 0;
  updateProductList: any | undefined;


  constructor(
    private productListService: ProductlistService,
    private loginService: LoginService,
    private viewbag: ViewbagService,
    private router: Router,
    private listService: ListService
  ) {


  }

  ngOnInit(): void {
    this.userId = parseInt(this.loginService.getTokenUserId(), 10);
    this.listId = this.viewbag.sharedData as number;


    this.loadShoppingList();
    this.updateProductList = {
      id: 0,
      productId: 0,
      listId: 0,
      status: true
    }


  }

  loadShoppingList() {
    this.productListService.getAll(this.listId).subscribe({
      next: (x) => {
        this.myShoppingList = x.filter(a => a.status === true);
        console.log("listid değerim:" + this.listId);
        console.log(x);

        if (this.myShoppingList.length === 0) {
          alert("Alınacak tüm ürünleri aldınız.")
        }

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


  isBought(id: number, description: string, status: boolean) {

    this.updateProductList.id = id;
    this.updateProductList.description = description;
    this.updateProductList.status = false;
    this.updateProductList.listId = this.listId;

    console.log(this.updateProductList as Productlist);

    this.productListService.update(this.updateProductList as Productlist).subscribe({
      next: (x) => {
        this.loadShoppingList();
      },
      error: (e: any) => { },
      complete: () => { }
    })



  }


  shoppingEnd(mylistid: number) {

    this.listService.getList(mylistid).subscribe({
      next: (x) => {

        const updatedList: List = {
          id: x.id,
          userId: x.userId,
          name: x.name,
          status: true,
        };


        //false olan kayıtları true olarak ayarlıcam,böylece tekrar aynı liste alışverişe çık derse listede görünür olacak
        this.productListService.getByListId(mylistid).subscribe({
          next: (x) => {
            this.myShoppingList = x.filter(a => a.status === false);
            this.myShoppingList.forEach((p) => {
              p.status = true;
              this.productListService.update(p as Productlist).subscribe({
                next: (x) => {

                },
                error: (e: any) => { },
                complete: () => { }
              })

            })

          }
        })



        this.listService.updateListStatus(updatedList).subscribe({
          next: (y) => { this.router.navigateByUrl('/ui') },
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
