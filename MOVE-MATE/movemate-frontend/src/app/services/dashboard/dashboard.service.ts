import { API_URL } from './../../../config/api.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observer, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  data: Array<Object> = [{}]
  dataChange: Subject<Array<Object>> = new Subject<Array<Object>>();

  constructor(private httpClient: HttpClient) {

    this.httpClient.get(`${API_URL}/reservations`).subscribe({
      next: (response: any) => {
        this.dataChange.next(response)
      }
    })


    this.dataChange.subscribe((value => {
      this.data = value
    }))
  }

}
