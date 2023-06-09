import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

import { BookShopListComponent } from './book-shop-list/book-shop-list.component';

const routes: Routes = [
  
  {path:'book-list',component:BookListComponent},
  {path:'',redirectTo:'book-list',pathMatch:"full"},
  {path:'bookshop-list',component:BookShopListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
