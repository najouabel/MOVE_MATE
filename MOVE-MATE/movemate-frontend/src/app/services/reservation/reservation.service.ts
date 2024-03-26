 import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation';
import { Response } from 'src/app/interfaces/response';
import { API_URL } from 'src/config/api.constants';
 import {Service} from "../../interfaces/Service";
 import {ParkService} from "../../interfaces/ParkService";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private parkPrice = new BehaviorSubject(29);
  private headers!:HttpHeaders;
  private departSites = new BehaviorSubject([]);
  // private arrivalSites :ISite[] = [];
  private departMeetings= new BehaviorSubject([]);
  // private arrivalMeetings:any = [];

  selectedServicesSubj = new BehaviorSubject([{}]);

  reservFormSub = new BehaviorSubject({});
  current: string = 'order'


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

    saveReservation(reservation: any) {
      console.log(reservation)
      console.log((this.selectedServicesSubj.value[0] as ParkService).name)
      console.log({
        "service": reservation.service,
        "description": reservation.departureDate,
        "meantype": (this.selectedServicesSubj.value[0] as ParkService).name,
        "_to": reservation.arrivalSite,
        "_from": reservation.departureSite
      })
      return this.http
        .post<{
          id: number
        }>(
          `${API_URL}/errands`,
          {
            "service": reservation.service,
            "description": reservation.departureDate,
            "meantype": (this.selectedServicesSubj.value[0] as ParkService).name,
            "_to": reservation.arrivalSite,
            "_from": reservation.departureSite
          }, {headers : this.headers}
        )
  }


  getPriceSubAsObs(){
    return this.parkPrice.asObservable();
  }

  getReservFormSubAsObs(){
    return this.reservFormSub.asObservable();
  }


  setDepartSites(sites:any){
    this.departSites = sites;
  }

  getDepartSitesAsObs(){
    return this.departSites.asObservable();
  }

  getDepartMeetingsAsObs(){
    return this.departMeetings.asObservable();
  }

  getSelectedServicesSubjAsObs(){
    return this.selectedServicesSubj.asObservable();
  }

  updateDepartSitesState(val:any){
    this.departSites.next(val);
  }

  updateDepartMeetingsState(val:any){
    this.departMeetings.next(val);
  }
  // setArrivalSites(sites:any){
  //   this.arrivalSites = sites;
  // }
  setArrivalMeetings(meeting:any){
    this.departMeetings = meeting;
  }
  // setDepartMeetings(meeting:any){
  //   this.arrivalMeetings = meeting;
  // }

}
