import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://127.0.0.1:8000'

    constructor(private http: HttpClient) {}

    getCsrfCookie(): Observable<any> {
        return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`).pipe(
            tap(() => console.log('CSRF cookie obtained.'))
        );
    }

    login(userEmail: string, userPassword: string): Observable<any> {
        console.log("Auth services", userEmail)
        const requestBody = {
            email: userEmail,
            password: userPassword
        };
        
        return this.http.post<any>(`${this.apiUrl}/api/auth`, requestBody);
    }

    setToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }
}