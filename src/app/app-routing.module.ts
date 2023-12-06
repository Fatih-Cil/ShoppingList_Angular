import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutadminComponent } from './admin/layoutadmin/layoutadmin.component';
import { CategoryComponent } from './admin/pages/category/category.component';
import { ProductComponent } from './admin/pages/product/product.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { LayoutuiComponent } from './ui/layoutui/layoutui.component';
import { ListsComponent } from './ui/pages/lists/lists.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddcategoryComponent } from './admin/pages/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './admin/pages/category/updatecategory/updatecategory.component';

const routes: Routes = [
{path:"",component:LoginComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"admin",component:LayoutadminComponent,children:[
  {path:"",component:DashboardComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"category",component:CategoryComponent},
  {path:"product",component:ProductComponent},
  {path:"addcategory",component:AddcategoryComponent},
  {path:"updatecategory/:id",component:UpdatecategoryComponent}
  
]},

{path:"ui",component:LayoutuiComponent,children:[
  {path:"",component:ListsComponent},
  {path:"lists",component:ListsComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }