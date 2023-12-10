import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { Dashboard } from '../../models/dashboard';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

categoryCount:number=0
productCount:number=0
userCount:number=0
  /**
   *
   */
  constructor(private dashboardService:DashboardService,private router:Router) {
   
    
  }
  ngOnInit(): void {

     this.load();
    
    
  }


  load(){

    this.dashboardService.getCategory().subscribe({
      next:(x)=>this.categoryCount=x.length,
      error:(e:any)=>{},
      complete:()=>{}
    });

    this.dashboardService.getProduct().subscribe({
      next:(x)=>this.productCount=x.length,
      error:(e:any)=>{},
      complete:()=>{}
    });

    this.dashboardService.getUser().subscribe({
      next:(x)=>this.userCount=x.length,
      error:(e:any)=>{},
      complete:()=>{}
    })

  }

}
