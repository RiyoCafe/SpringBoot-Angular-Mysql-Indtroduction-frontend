import { Component ,Inject,OnInit,ViewChild} from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { BookshopServiceService } from '../bookshop.service.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { BooksService } from '../book.service';
import { BookShopListComponent } from '../book-shop-list/book-shop-list.component';
@Component({
  selector: 'app-optionadding-books',
  templateUrl: './optionadding-books.component.html',
  styleUrls: ['./optionadding-books.component.css']
})
export class OptionaddingBooksComponent implements OnInit {
 
  values:any=[]
  productFrom !:FormGroup

  constructor(private formBuilder:FormBuilder,
    private bookshoplist:BookShopListComponent,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private bookshopservice:BookshopServiceService,
    private service:BooksService,private matDialogRef:MatDialogRef<OptionaddingBooksComponent>){

  }
  ngOnInit(): void {
    this.service.getBooks().subscribe(data=>{
      this.values=data;
      console.log(this.values);
    })
    this.productFrom=this.formBuilder.group({
      booknum:[],
      shop_no:[]
    })

    
    
  }
  saveBook()
  {
    
    
      console.log(this.productFrom.value.booknum.book_id)
       this.bookshopservice.putBookinBookshop(this.editData.shop_no,this.productFrom.value.booknum.book_id,this.editData)
       .subscribe(
        {
          next:(res)=>{
            alert("Book added")
            this.productFrom.reset();
            this.matDialogRef.close('save');
          },
          error:()=>{
            alert("Error in save book in bookshop")
          }
        }
       )
    }
  
}
