import { ReservationService } from './../../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequest } from 'src/app/interfaces/signupRequest';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading!:boolean;
  isSuccess!:Boolean;
  loadingSignupResult!:Boolean;
  animationSrc!:string;
  signupForm!:FormGroup;
  signupRequest!:SignupRequest;

  constructor(private authService:AuthService, private router:Router) {
    this.signupForm = new FormGroup({
      username : new FormControl('',[
        Validators.required,
        ],
      ),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]
      ),
      password: new FormControl('',[
        Validators.required,
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        ],),
      repeatpassword: new FormControl('',[
        Validators.required,
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        ],),
      tele: new FormControl('',[
        Validators.required
        ],),
      toSubscribe: new FormControl(true,[

        ],),

    })
  }

  ngOnInit(): void {
  }


  onSubmit(event:any) {
    this.loading = true;
    console.log(" isnode ")
    const {repeatpassword, ...rest} = this.signupForm.value;

    console.warn(this.signupRequest);
    //signup user
    this.authService.signup(rest).subscribe(
      {
        next: data => {
          console.log("data ", data );
          this.isSuccess = true;
        },
        error: err => this.isSuccess = false
      }).add(() => {
        this.loading = false;
        if(!this.isSuccess) return;
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
      });
  }


  get username (){ return this.signupForm.get('username')};
  get tele (){ return this.signupForm.get('tele')};
  get email (){ return this.signupForm.get('email')};
  get password (){ return this.signupForm.get('password')};
  get repeatpassword (){ return this.signupForm.get('repeatpassword')};
  get toSubscribe (){ return this.signupForm.get('toSubscribe')};
}
