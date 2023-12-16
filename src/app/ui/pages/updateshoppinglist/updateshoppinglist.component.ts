import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductlistService } from '../../services/productlist.service';
import { Router } from '@angular/router';
import { ViewbagService } from '../../services/viewbag.service';

@Component({
  selector: 'app-updateshoppinglist',
  templateUrl: './updateshoppinglist.component.html',
  styleUrls: ['./updateshoppinglist.component.css']
})
export class UpdateshoppinglistComponent implements OnInit {
  

  currentDataString$: string='';
  currentDataId$: number=0;
  currentDataListId$: number=0;

  updateListForm=new FormGroup({
    description:new FormControl(''),
    id:new FormControl(0),
    listId:new FormControl(0),
  });
  
  
  constructor(private productListService:ProductlistService,private router:Router,private viewbag:ViewbagService) {
  
    
  }
  ngOnInit() {
    

    this.openModal();

  }

  openModal() {
    
    this.productListService.currentDataString.subscribe((dataString) => {
      this.currentDataString$ = dataString;

    });

    this.productListService.currentDataId.subscribe((dataId) => {
      this.currentDataId$ = dataId;
    });
    this.productListService.currentDataListId.subscribe((dataListId) => {
      this.currentDataListId$ = dataListId;
    });

    this.updateListForm.get('description')?.setValue(this.currentDataString$);
    this.updateListForm.get('id')?.setValue(this.currentDataId$);
    this.updateListForm.get('listId')?.setValue(this.currentDataListId$);
   
      
    
  }
  returnPage(){

    
    this.router.navigateByUrl('/ui/lists/addproducttolist')
  }



}
