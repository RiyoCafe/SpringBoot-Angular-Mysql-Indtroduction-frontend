import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';

import { BooksService } from './book.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialComponent } from './demo-material/demo-material.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BookShopListComponent } from './book-shop-list/book-shop-list.component';
import { BookShowComponent } from './book-show/book-show.component';
import { DialogBookshopComponent } from './dialog-bookshop/dialog-bookshop.component';
import { OptionaddingBooksComponent } from './optionadding-books/optionadding-books.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    DemoMaterialComponent,
    DialogComponent,
    BookShopListComponent,
    BookShowComponent,
    DialogBookshopComponent,
    OptionaddingBooksComponent,
   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,MatToolbarModule,MatButtonModule,MatDialogModule,
    MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,
    FormsModule,MatTableModule,MatPaginatorModule,MatSortModule
    
  ],
  providers: [
    BooksService,
    BookListComponent,
    BookShowComponent,BookShopListComponent,OptionaddingBooksComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
