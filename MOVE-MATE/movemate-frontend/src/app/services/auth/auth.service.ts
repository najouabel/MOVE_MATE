import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { SignupRequest } from 'src/app/interfaces/signupRequest';
import { JwtHandlerService } from './jwt-handler.service';
import { API_URL } from 'src/config/api.constants';
import { LoginRequest } from 'src/app/interfaces/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStateSubject!:BehaviorSubject<boolean>;
  isAuthenticated!:boolean;

  constructor(
    private http: HttpClient,
    private jwtService:JwtHandlerService
  ) {
    if(!this.jwtService.isTokenExpired()) {
      this.authStateSubject = new BehaviorSubject<boolean>(true);
    } else {
      this.authStateSubject = new BehaviorSubject<boolean>(false);
    }

     this.authStateSubject.subscribe(
          (newValue) => this.isAuthenticated = newValue
      )
   }

   signup(newUser : SignupRequest) : Observable<String>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
            .post<any>(
              `${API_URL}/auth/signup`, newUser, {headers}
            );
  }

  login(loginCredentials : LoginRequest) : Observable<String> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
            .post<String>(
              `${API_URL}/auth/login`, loginCredentials, {headers}
            );
  }

  setAuthState(authState:boolean){
    this.authStateSubject.next(authState);
  }

  getAuthState() : Observable<boolean>{
    return this.authStateSubject.asObservable();
  }


  logout() {
    localStorage.removeItem("movemate-token");
    this.setAuthState(false);
  }
}
