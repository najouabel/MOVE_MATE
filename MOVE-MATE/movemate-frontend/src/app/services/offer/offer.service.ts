import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterOperation} from 'src/app/interfaces/filterOperation';
import { Offer } from 'src/app/interfaces/offer';
import { OfferRequest } from 'src/app/interfaces/OfferRequest';
import { Reservation } from 'src/app/interfaces/reservation';
import { API_URL } from 'src/config/api.constants';
import { JwtHandlerService } from '../auth/jwt-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private headers!:HttpHeaders;
  searchValuesBSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  filterCriteriaObj!:FilterOperation[];

  // employer_id:Number = 2;
  employer_id!:String;


  constructor(private http: HttpClient, private jwtHandlerService:JwtHandlerService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    this.getSearchValsObser().subscribe(val => {
      this.filterCriteriaObj = val
    })
  }

  getOffers(filters:FilterOperation[]) : Observable<any>{
    if(filters != null){
      let filter_url = `${API_URL}/errands?`;
      console.log(" url " + filter_url)
      filters.forEach((filter, key, arr) => {
        filter_url += filter.value != null ? `${filter.key}=${filter.value}` : "";
        if (!Object.is(arr.length - 1, key) && filter.value != null && filter.value != "") {
          // execute last item logic
          filter_url += "&";
        }
      })

      if(filter_url.endsWith("&")) filter_url = filter_url.slice(0, -1);

     console.log(" url " + filter_url)
      return this.http
      .get<any>(
        filter_url,
        {headers : this.headers}
        );

    }
    console.log(" no filter ")
    return this.http
                .get<Offer[]>(
                  `${API_URL}/errands`, {headers : this.headers}
                  );
    }

    getOffersByProvider(){
      return this.http.get<Offer[]>(
        `${API_URL}/errands/providers`, {headers : this.headers}
      );
    }

    reserve(reservationRequest:any) : Observable<Reservation>{
      return this.http
                .post<Reservation>(
                  `${API_URL}/reservations`, reservationRequest, {headers : this.headers}
                  );
    }

    saveOffer(offer: OfferRequest) : Observable<Offer>{
      return this.http
      .post<Offer>(
              `${API_URL}/offers`, offer, {headers : this.headers}
              );
    }

    getSearchValsObser(){
      return this.searchValuesBSubject.asObservable();
    }

    forwardSeachValues(newValue:any){
      this.searchValuesBSubject.next(newValue);
    }
}
