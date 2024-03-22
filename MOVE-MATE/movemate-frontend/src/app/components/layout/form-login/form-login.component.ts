import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHandlerService } from 'src/app/services/auth/jwt-handler.service';
import { LocalStorageService } from 'src/app/services/auth/local-storage.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  private jwt!:String;

  loginForm!:FormGroup;
  isAuthenticated = false;
  loading!:boolean;
  userEmail:string = "";
  animationSrc!:string;

  constructor(
    private authService:AuthService,
    private jwtService:JwtHandlerService,
    private storageService:LocalStorageService,
    private router:Router
    ) {
    this.authService.getAuthState().subscribe((newState) => {
      this.isAuthenticated = newState
      if(this.isAuthenticated){
        this.userEmail = this.jwtService.getEmail()!;
      }
    })
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
          Validators.required,
          Validators.email
        ]
      ),
      password: new FormControl('',[
        Validators.required,
        ],)
    });

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  onSubmit() {
    console.log(" login form" )
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
        next : (response) => {
            this.jwt = response;
            this.storageService.set("movemate-token", this.jwt.toString());
            this.authService.setAuthState(true);

        },

        error : (err) => {
           this.authService.setAuthState(false);
           alert("Invalid login credentials");
          console.log(" inside fail login")
        },
        complete : ()=> {}
      }
    ).add(() => {
      this.loading = false;
    });
  }

}
