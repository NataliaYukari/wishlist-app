import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NewUserService {

    private apiUrl = 'http://127.0.0.1:8000/api/newUser'

    constructor(private http: HttpClient) {}

    newUser(userEmail: string, userPassword: string): Observable<any> {
        console.log("New user services", userEmail)

        const requestBody = {
            email: userEmail,
            password: userPassword
        };

        return this.http.post<any>(`${this.apiUrl}`, requestBody);
    }
}