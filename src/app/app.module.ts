import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutadminComponent } from './admin/layoutadmin/layoutadmin.component';
import { LayoutuiComponent } from './ui/layoutui/layoutui.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { CategoryComponent } from './admin/pages/category/category.component';
import { ProductComponent } from './admin/pages/product/product.component';
import { ListsComponent } from './ui/pages/lists/lists.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddcategoryComponent } from './admin/pages/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './admin/pages/category/updatecategory/updatecategory.component';
import { environment } from 'src/environments/environment.development';
import { AddproductComponent } from './admin/pages/product/addproduct/addproduct.component';
import { UpdateproductComponent } from './admin/pages/product/updateproduct/updateproduct.component';
import { AddlistComponent } from './ui/pages/addlist/addlist.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutadminComponent,
    LayoutuiComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    ListsComponent,
    LoginComponent,
    RegisterComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    AddproductComponent,
    UpdateproductComponent,
    AddlistComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:'BASE_API_URL',useValue:environment.baseUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
