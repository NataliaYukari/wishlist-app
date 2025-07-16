import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core'; 

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Interceptor: Interceptando requisição para:', req.url); 

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Adiciona o token JWT
      }
    });
    console.log('Interceptor: Adicionando token JWT ao cabeçalho.'); 
  } else {
    console.log('Interceptor: Nenhum token JWT encontrado.'); 
  }

  return next(req);
};
