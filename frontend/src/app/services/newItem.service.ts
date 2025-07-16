import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WishlistItem } from "../item.interface";

@Injectable({
    providedIn: 'root'
})

export class NewItemService {

    private apiUrl = 'http://localhost:8000/api/newItem'

    constructor(private http: HttpClient) {}

    newItem(newItemData: WishlistItem): Observable<any> {
        console.log("New item services", newItemData.itemName)

        return this.http.post<any>(`${this.apiUrl}`, newItemData);
    }
}