import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookshopServiceService } from '../bookshop.service.service';
import { DialogBookshopComponent } from '../dialog-bookshop/dialog-bookshop.component';
import { OptionaddingBooksComponent } from '../optionadding-books/optionadding-books.component';

@Component({
  selector: 'app-book-shop-list',
  templateUrl: './book-shop-list.component.html',
  styleUrls: ['./book-shop-list.component.css']
})
export class BookShopListComponent implements OnInit {
  title="List of BookShops"
  shopId!:number
  bookshops:any=[]
  displayedColumns: string[] = ['shop_no','title','price','publishYear','location','email','contact_no','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:BookshopServiceService,private dialog:MatDialog){

  }
  getAllBookShops()
  {
    this.service.getAllbookShops().subscribe(data=>{
      console.log(data);
      this.bookshops=data;
      this.dataSource=new MatTableDataSource(this.bookshops);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  openDialog() {
    this.dialog.open(DialogBookshopComponent,{
     width:'50%'
    }).afterClosed().subscribe(val=>{
     if(val === 'save'){
       this.getAllBookShops();
     }
    });
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogBookshopComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllBookShops();
      }
    })
  }


  deleteProduct(id:number)
  {
    console.log(id);
    this.service.deleteBookshop(id).subscribe({
      next:(res)=>{
        alert("Book deleted successfully!")
        this.getAllBookShops()
      },
      error:(res)=>{
        alert("Delete All the books at first")
      }
    })
  }
  addBooksinShop(id:number)
  {
      this.shopId=id;
      console.log("shop id is "+this.shopId)
      this.dialog.open(OptionaddingBooksComponent,{
        width:'50%',
        data:{'shop_no':id}
      
      }).afterClosed().subscribe(val=>{
          if(val==='save')
            this.getAllBookShops();
      })
  }

  ngOnInit(): void {
   this.getAllBookShops();
  }
}
