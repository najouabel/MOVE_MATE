import { Reservation } from 'src/app/interfaces/reservation';

import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { IUpdateOffer } from 'src/app/interfaces/updateOffer';
import { JwtHandlerService } from 'src/app/services/auth/jwt-handler.service';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer!: Offer;
  @Input("isShowDetails") showDetails!: Boolean;
  userRole!:string;
  updateOfferTemp!:IUpdateOffer;
  offerImage:string = ""
  reservation!:Reservation;

  constructor(private jwtService:JwtHandlerService, private offerService:OfferService) {
  }

  ngOnInit(): void {
    this.userRole = this.jwtService.getRole()!;
      this.offerImage = "truck.svg";

  }

  reserve(offerId:number){
    console.log(" selected offer")
    console.log(this.offer)

    const reservationRequest= {
      errandId: offerId
    }

    this.offerService.reserve(reservationRequest).subscribe(
      {
        next: (response) => {
          console.log(" received reservation", response);
          this.reservation = response;
        },
        error : (err) => console.log("err ", err.toString())
      }
    );
    this.updateOfferTemp = {};
  }
}
