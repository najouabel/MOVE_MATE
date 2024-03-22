import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { ParkService } from 'src/app/interfaces/ParkService';

@Component({
  selector: 'app-form-services',
  templateUrl: './form-services.component.html',
  styleUrls: ['./form-services.component.css']
})
export class FormServicesComponent implements OnInit {
  parkServices:ParkService[] = []
  selectedParkServices:ParkService[] = []
  constructor(private reservationService:ReservationService) {
    this.parkServices = [
      {id: 1, name:"GRAND_CAMION", price: 5, image:"grand.png"},
      {id: 2, name:"MOYEN_CAMION", price: 20, image:"moyen.png"},
      {id: 3, name:"PETIT_CAMION", price: 35, image:"petit.png"},
    ]
  }

  ngOnInit(): void {
  }

  onServiceAdd(service:ParkService){
    console.log(" id ", service.id)
    const selectedService:ParkService | undefined = this.parkServices.find(elm => elm == service);
    if(selectedService) {
      if(!selectedService!.selected){
        selectedService!.selected = true;
      }
      else selectedService!.selected = !selectedService!.selected;
    }

    this.selectedParkServices = this.parkServices.filter(elm => elm.selected === true);

    this.reservationService.selectedServicesSubj.next(this.selectedParkServices);
  }
}
