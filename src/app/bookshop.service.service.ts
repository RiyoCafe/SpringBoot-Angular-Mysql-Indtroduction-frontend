import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookshopServiceService {
  private baseUrl="http://localhost:8080/api/bookshop"
  constructor(private http:HttpClient) { }

  getAllbookShops()
  {
    return this.http.get(`${this.baseUrl}`);
  }
  postBookshop(data:any){
    return this.http.post<any>(`${this.baseUrl}`,data);
  }
  putBookshop(data:any,id:number){
    return this.http.put<any>("http://localhost:8080/api/bookshop/"+id,data);
  }
  deleteBookshop(id:number){
    return this.http.delete<any>(`${this.baseUrl}`+'/'+id);
  }
  putBookinBookshop(bookshop_no:number,book_no:number,data:any){
    return this.http.put<any>("http://localhost:8080/bookshop/"+bookshop_no+"/books/"+book_no,data);
  }
}
