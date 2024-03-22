import { City } from './../../interfaces/City';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { reservationRequest } from 'src/app/interfaces/reservationRequest';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  reservationForm!:reservationRequest;
  departDate:any = "Date";
  checkin:any = "Checkin";
  arrivalDate:any = "Date";
  checkout:any = "Checkout";
  departMeetingPoint:any = "Meeting Point";
  arrivalMeetingPoint:any = "Meeting Point";
  departSite:any = {name:"Site"};
  arrivalSite:any = {name:"Site"};
  price:any = "...";

  allSites:City[] = [];
  allMeeting:City[] = [];

  constructor(private reservService:ReservationService) {
    this.reservService.getDepartSitesAsObs().subscribe(
      (val) => {
        this.allSites = val
      }
    );
    this.reservService.getDepartMeetingsAsObs().subscribe(
      (val) => this.allMeeting = val
    );

    this.reservService.getPriceSubAsObs().subscribe(val => {
      this.price = val;
    })
   }

  ngOnInit(): void {

    this.reservService.getReservFormSubAsObs().subscribe(val => {
      if(val){
        this.reservationForm = val as reservationRequest;
        this.departDate = this.reservationForm.departureDate || "Date" ;

        this.departSite = this.allSites?.find(elm => {
          return elm?.name == this.reservationForm.departureSite
        });

        this.arrivalSite = this.departSite;

        // this.arrivalSite = this.allSites.find(elm => elm?.id === this.reservationForm.arrivalSite?.id)?.name;
      }
    })

  }


}
