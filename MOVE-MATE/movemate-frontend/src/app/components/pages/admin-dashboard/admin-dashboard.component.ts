import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { API_URL } from 'src/config/api.constants';
import {DashboardService} from "../../../services/dashboard/dashboard.service";

type Response = {
  "date": string,
  "data": object,
  "status": number,
  "responseStatus": string,
  "message":string
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  current: string = 'reservations'
  constructor(private httpClient: HttpClient,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  setCurrent(value: string){
    this.current = value
    this.httpClient.get(`${API_URL}/${value}`).subscribe({
      next: (response:any) => {
        this.dashboardService.dataChange.next(response)
        console.log(this.dashboardService.data)
      }
    })
  }

}
