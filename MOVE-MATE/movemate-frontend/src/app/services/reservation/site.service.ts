import { City } from './../../interfaces/City';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/config/api.constants';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private headers!:HttpHeaders;


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

   getSites() : Observable<City[]>{
    return this.http
    .get<City[]>(
      `${API_URL}/cities`, {headers : this.headers}
      );
    }

  // saveSite(offer: siteRequest) : Observable<Response<Site>>{
  //   return this.http
  //   .post<Response<Site>>(
  //           `${API_URL}/offers/add`, offer, {headers : this.headers}
  //           );
  // }
}
