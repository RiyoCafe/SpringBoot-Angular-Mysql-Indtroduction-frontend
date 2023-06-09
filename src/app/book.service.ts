import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';
@Injectable()
export class BooksService{
    private baseUrl="http://localhost:8080/api/books";
    constructor(private http:HttpClient)
    {

    }
    getBooks()
    {
        return this.http.get(`${this.baseUrl}`);
    }
    postBooks(data:any)
    {
        console.log(data);
        return this.http.post<any>(`${this.baseUrl}`,data);
    }
    putBooks(data:any,id:number)
    {
        return this.http.put<any>("http://localhost:8080/api/booksput/"+id,data);
    }
    deleteBooks(id:number){
        return this.http.delete<any>("http://localhost:8080/api/booksdelete/"+id);
    }
    viewBookById(id:number)
    {
        return this.http.get<any>("http://localhost:8080/api/booksget/"+id);
    }
}