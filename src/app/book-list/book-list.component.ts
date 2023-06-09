import { Component, OnInit ,ViewChild} from '@angular/core';
import { BooksService } from '../book.service';
import { Book } from '../book';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { BookShowComponent } from '../book-show/book-show.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  title="List of Books";

  displayedColumns: string[] = ['book_id','title','price','publishYear','author','genre','publisher','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  books:any=[];
  
  constructor(private service:BooksService,
    private dialog:MatDialog){
    
  }
  getAllbooks()
  {
    this.service.getBooks().subscribe(data=>{
      console.log("hey there"+data);
      this.books=data;
      this.dataSource=new MatTableDataSource(this.books);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  openDialog() {
     this.dialog.open(DialogComponent,{
      width:'50%'
     }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllbooks();
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
    this.dialog.open(DialogComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllbooks();
      }
    })
  }
  deleteProduct(id:number)
  {
    console.log(id);
    this.service.deleteBooks(id).subscribe({
      next:(res)=>{
        alert("Book deleted successfully!")
        this.getAllbooks()
      },
      error:(res)=>{
        alert("Error in deleteing book")
      }
    })
  }
  viewProduct(id:number)
  {
    console.log("view by id "+id);
    
    this.service.viewBookById(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.openDialogtoviewBook(res)
      },
      error:()=>{
        alert("Error");
      }
    })
  }
  openDialogtoviewBook(text:any)
  {
    this.dialog.open(BookShowComponent,{
      width:'50%',
      data:text
    })
  }
  ngOnInit(): void {
    this.getAllbooks();
  }

}
