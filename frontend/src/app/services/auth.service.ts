import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://127.0.0.1:8000/api/auth'

    constructor(private http: HttpClient) {}

    login(userEmail: string, userPassword: string): Observable<any> {
        console.log("Auth services", userEmail)
        const requestBody = {
            email: userEmail,
            password: userPassword
        };
        
        return this.http.post<any>(`${this.apiUrl}`, requestBody);
    }

    setToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }
}