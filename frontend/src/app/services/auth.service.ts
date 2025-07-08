import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    login(userEmail: string, userPassword: string): Observable<any> {
        console.log("Auth services", userEmail)
        const request = {
            email: userEmail,
            password: userPassword
        };
        
        return this.http.post<any>(`http://127.0.0.1:8000/api/auth`, request);
    }

    setToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }
}