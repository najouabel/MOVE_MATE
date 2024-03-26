import { ReservationService } from 'src/app/services/reservation/reservation.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ParkService } from 'src/app/interfaces/ParkService';

@Component({
  selector: 'app-form-services',
  templateUrl: './form-services.component.html',
  styleUrls: ['./form-services.component.css']
})
export class FormServicesComponent implements OnInit {
  parkServices:ParkService[] = []
  selectedParkServices:ParkService[] = []
  @Output() selectCamion: EventEmitter<string> = new EventEmitter<string>();
  constructor(private reservationService:ReservationService) {
    this.parkServices = [
      {id: 1, name:"BIG_CAMION", price: 400, image:"grand.png", selected: false },
      {id: 2, name:"MOYEN_CAMION", price: 300, image:"moyen.png", selected: false },
      {id: 3, name:"SMALL_CAMION", price: 200, image:"petit.png", selected: false },
    ]
  }

  ngOnInit(): void {
  }
  onServiceAdd(service: ParkService) {
    const selectedService = this.parkServices.find(elm => elm.id === service.id);

    if (selectedService) {
      selectedService.selected = !selectedService.selected;
      this.parkServices.forEach(s => {
        if (s.id !== service.id) {
          s.selected = false;
        }
      });
    }
    this.selectCamion.emit(service.id.toString())

    this.selectedParkServices = this.parkServices.filter(elm => elm.selected === true);
    this.reservationService.selectedServicesSubj.next(this.selectedParkServices);
  }


}
