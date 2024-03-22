import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/auth/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private jwt!:String;
  loading!:boolean;
  loadingLoginResult!:boolean;
  loginForm!:FormGroup;
  isAuthenticated:Boolean = false;
  animationSrc!:string;
  constructor(private authService:AuthService, private storageService:LocalStorageService, private router:Router) {
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
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ],)
    });
  }


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  onSubmit() {
    console.log(" login form")
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
        next : (response) => {
            this.jwt = response;
            this.storageService.set("movemate-token", this.jwt.toString());
            this.authService.setAuthState(true);
            this.isAuthenticated = true;
            this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });
        },

        error : (err) => {
          console.log(" erreur " +  JSON.stringify(err))
          this.authService.setAuthState(false);
          this.isAuthenticated = false;
          console.log(" inside fail login")
        },
        complete : ()=> {}
      }
    ).add(() => {
      this.loading = false;

    });
  }
}
