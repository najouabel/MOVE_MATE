import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHandlerService } from 'src/app/services/auth/jwt-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userEmail!:string;
  userRole!:string;
  dashboard!:string;
  loginPath:string = "/login"
  isAuthenticated!:boolean;

  constructor(private router:Router, private authService:AuthService, private jwtService:JwtHandlerService) {
    this.authService.getAuthState().subscribe((newState) => {
      this.isAuthenticated = newState
      if(this.isAuthenticated){
        this.userEmail = this.jwtService.getEmail()!;
      }
    })

  }

  ngOnInit(): void {
  }

  hasRoute(route:String) : boolean {
    // console.log(" router " + route)
    return this.router.url === route;
  }

  navigateToHome(){
    this.router.navigateByUrl("/home")
    .then(() => {
      window.location.reload();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }

}
