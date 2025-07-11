import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) {}

    login(userEmail: string, userPassword: string): Observable<any> {
        console.log("Auth services", userEmail)
        const requestBody = {
            email: userEmail,
            password: userPassword
        };
        
        return this.http.post<any>(`${this.apiUrl}/api/login`, requestBody)
        .pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                }
            })
        );
    }

    getUser(): Observable<any> {
        const token = this.getToken();

        return this.http.get(`${this.apiUrl}/api/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }


    setToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }
}