import { ProviderDashboardComponent } from './components/pages/provider-dashboard/provider-dashboard.component';
import { OffersComponent } from './components/pages/offers/offers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import {AdminDashboardComponent} from "./components/pages/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path:"home", component: HomeComponent },
  {path:"login", component: LoginComponent },
  {path:"signup", component: SignupComponent },
  {path:"offers", component : OffersComponent},
  {path:"dashboard/admin", component : AdminDashboardComponent},
  {path:"dashboard/provider", component : ProviderDashboardComponent},
  {path:"**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
