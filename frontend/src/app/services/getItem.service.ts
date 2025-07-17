import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { WishlistItem } from '../item.interface';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {
  private apiUrl = 'http://localhost:8000/api/items'; 

  constructor(private http: HttpClient) {}

  getItems(): Observable<WishlistItem[]> {
    return this.http.get<{ items: WishlistItem[] }>(this.apiUrl).pipe(
      map(response => response.items),
      tap(items => {
        console.log('lista de itens:', items);
      })
    );
  }

  deleteItem(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updateItem(id: string, updatedItem: Partial<WishlistItem>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, updatedItem, { headers });
  }

}


