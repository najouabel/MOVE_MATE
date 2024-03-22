import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-multi-step-bar',
  templateUrl: './multi-step-bar.component.html',
  styleUrls: ['./multi-step-bar.component.css']
})
export class MultiStepBarComponent implements OnInit {

  constructor(public reservationService: ReservationService) { }

  ngOnInit(): void {
  }

}
