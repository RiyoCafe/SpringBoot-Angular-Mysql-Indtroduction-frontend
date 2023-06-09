import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { BooksService } from '../book.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  values:any=[];
  actionBtn:string="Save"
  productFrom !:FormGroup
  constructor(private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private booklist:BookListComponent,
    private service:BooksService,private matDialogRef:MatDialogRef<DialogComponent>)
  {
    for(let i=0;i<=100;i++){
      this.values.push(i+1923);
    }
  }
  ngOnInit():void{
    this.productFrom=this.formBuilder.group({
      title:['',Validators.required],
      price:['',Validators.required],
      publishYear:['',Validators.required],
      author:['',Validators.required],
      genre:['',Validators.required],
      publisher:['',Validators.required],
    })
    if(this.editData){
      this.actionBtn="Update",
      this.productFrom.controls['title'].setValue(this.editData.title);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['publishYear'].setValue(this.editData.publishYear);
      this.productFrom.controls['author'].setValue(this.editData.author);
      this.productFrom.controls['genre'].setValue(this.editData.genre);
      this.productFrom.controls['publisher'].setValue(this.editData.publisher);
      
    }
  }
  addBook()
  {
    if(!this.editData){
      if(this.productFrom.valid)
      {
        this.service.postBooks(this.productFrom.value).subscribe
        ({
          next:(res)=>{
            alert("Book added successfully");
            this.productFrom.reset();
            this.matDialogRef.close('save');
          },
          error:()=>{
            alert("Error")
          }
        })
      }
    }else{
      this.updateProduct();
    }
    
  }
  updateProduct(){
   this.service.putBooks(this.productFrom.value,this.editData.book_id).subscribe({
      next:(res)=>
      {
        alert("Book Updated successfully");
        this.productFrom.reset();
        this.matDialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the book");
      }
   })
  }
  
}
