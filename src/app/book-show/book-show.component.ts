import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { BookListComponent } from '../book-list/book-list.component';
import { BooksService } from '../book.service';
@Component({
  selector: 'app-book-show',
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.css']
})
export class BookShowComponent implements OnInit {
  productFrom !:FormGroup
  
  constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public editData:any,
  private booklist:BookListComponent,
  private service:BooksService,private matDialogRef:MatDialogRef<BookShowComponent>){

    this.productFrom=this.formBuilder.group({
      title:[],
      price:[],
      publishYear:[],
      author:[],
      genre:[],
      publisher:[],
      bookshop:[]
    })

    if(this.editData){
      if(this.editData){
        this.productFrom.controls['title'].setValue(this.editData.title);
        this.productFrom.controls['price'].setValue(this.editData.price);
        this.productFrom.controls['publishYear'].setValue(this.editData.publishYear);
        this.productFrom.controls['author'].setValue(this.editData.author);
        this.productFrom.controls['genre'].setValue(this.editData.genre);
        this.productFrom.controls['publisher'].setValue(this.editData.publisher);
        if(this.editData.bookshop!=null){
          this.productFrom.controls['bookshop'].setValue(this.editData.bookshop.shop_no);
        }else{
          this.productFrom.controls['bookshop'].setValue('Not assigned');
        }
      }
    }

  }
  ngOnInit(): void {
    
  }
  
}
