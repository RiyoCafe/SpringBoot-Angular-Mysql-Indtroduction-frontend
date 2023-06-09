import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { BookShopListComponent } from '../book-shop-list/book-shop-list.component';
import { BookshopServiceService } from '../bookshop.service.service';
@Component({
  selector: 'app-dialog-bookshop',
  templateUrl: './dialog-bookshop.component.html',
  styleUrls: ['./dialog-bookshop.component.css']
})
export class DialogBookshopComponent implements OnInit{
  values:any=[];
  actionBtn:string="Save"
  productFrom !:FormGroup

  constructor(private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private bookShoplist:BookShopListComponent,
    private service:BookshopServiceService,private matDialogRef:MatDialogRef<DialogBookshopComponent>){
      for(let i=0;i<=100;i++){
        this.values.push(i+1923);
      }
    }
  ngOnInit(): void {
    this.productFrom=this.formBuilder.group({
      title:['',Validators.required],
      price:['',Validators.required],
      publishYear:['',Validators.required],
      location:['',Validators.required],
      email:['',Validators.required],
      contact_no:['',Validators.required],
    })
    if(this.editData){
      this.actionBtn="Update",
      this.productFrom.controls['title'].setValue(this.editData.title);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['publishYear'].setValue(this.editData.publishYear);
      this.productFrom.controls['location'].setValue(this.editData.location);
      this.productFrom.controls['email'].setValue(this.editData.email);
      this.productFrom.controls['contact_no'].setValue(this.editData.contact_no);
      
    }
  }


  addBookShop()
  {
    if(!this.editData){
      if(this.productFrom.valid)
      {
        this.service.postBookshop(this.productFrom.value).subscribe
        ({
          next:(res)=>{
            alert("BookShop added successfully");
            this.productFrom.reset();
            this.matDialogRef.close('save');
          },
          error:()=>{
            alert("Error")
          }
        })
      }
    }else{
      this.updateBookShop();
    }
    
  }
  updateBookShop(){
   this.service.putBookshop(this.productFrom.value,this.editData.shop_no).subscribe({
      next:(res)=>
      {
        alert("BookShop Updated successfully");
        this.productFrom.reset();
        this.matDialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the book");
      }
   })
  }
}
