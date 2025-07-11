import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NewUserService {

    private apiUrl = 'http://localhost/api/newUser'

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