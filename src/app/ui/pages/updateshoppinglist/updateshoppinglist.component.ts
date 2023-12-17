import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductlistService } from '../../services/productlist.service';
import { Router } from '@angular/router';
import { ViewbagService } from '../../services/viewbag.service';
import { Updateproductlist } from '../../models/updateproductlist';

@Component({
  selector: 'app-updateshoppinglist',
  templateUrl: './updateshoppinglist.component.html',
  styleUrls: ['./updateshoppinglist.component.css']
})
export class UpdateshoppinglistComponent implements OnInit {
  

  currentDataString$: string='';
  currentDataId$: number=0;
  

  updateListForm=new FormGroup({
    description:new FormControl(''),
    id:new FormControl(0),
    
  });
  descriptionValid:string='';
  
  
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
   

    this.updateListForm.get('description')?.setValue(this.currentDataString$);
    this.updateListForm.get('id')?.setValue(this.currentDataId$);
    
  }
  returnPage(){

    
    this.router.navigateByUrl('/ui/lists/addproducttolist')
  }

  updateDescription(){
    this.productListService.update(this.updateListForm.value as Updateproductlist).subscribe({
      next:(x)=>{
        
        this.router.navigateByUrl('/ui/lists/addproducttolist')


      },
      error:(e:any)=>{
        if(e.status==400){
        console.log(e);
        
        this.descriptionValid = e.error.errors.Description != null ? e.error.errors.Description[0] : '';

      }},
      complete:()=>{}
    })

  }


}
