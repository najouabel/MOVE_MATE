import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { reservationRequest } from 'src/app/interfaces/reservationRequest';

@Component({
  selector: 'app-reservation-quote',
  templateUrl: './reservation-quote.component.html',
  styleUrls: ['./reservation-quote.component.css']
})
export class ReservationQuoteComponent implements OnInit {
  @Output() public showDetailedFormEmitter = new EventEmitter();
  price!:Number;
  private reservForm!:reservationRequest;
  reserDates:string[] = []

  constructor(private reservService:ReservationService) {
    this.reservService.getPriceSubAsObs().subscribe(val => {
      this.price = val;
    });
  }

  ngOnInit(): void {
    this.reservService.getReservFormSubAsObs().subscribe(val => {
      if(val instanceof FormGroup){
        var frmGrp = val as FormGroup;
        this.reservForm = frmGrp.value;
      } else {
        this.reservForm = val as reservationRequest
      }
      // this.reserDates = [this.reservForm.arrivalDate!, this.reservForm.departureDate!];

    })
  }


  showDetailedForm(){
    this.showDetailedFormEmitter.emit(true);
  }

}
