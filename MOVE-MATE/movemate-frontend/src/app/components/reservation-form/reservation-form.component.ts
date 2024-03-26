
import { ReservationService } from './../../services/reservation/reservation.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from 'src/app/services/reservation/site.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParkService } from 'src/app/interfaces/ParkService';
import { Service } from 'src/app/interfaces/Service';
import { City } from 'src/app/interfaces/City';
import { reservationRequest } from 'src/app/interfaces/reservationRequest';
import {API_URL} from "../../../config/api.constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!:FormGroup;
   listUsers: Array<User> =[];

  completedReservation!: {
    form:reservationRequest,
    services: ParkService[]
  };

  services:Service[] = [];
  cities:City[] = [];
  departMinDate!:any;
  departureHours:any[] = [];
  arrivalHours:any[] = [];
  selectedServices:ParkService[] = [];
  isAuthenticated:boolean = false;
  isLoading:boolean = false;
  isSuccess!:boolean;
  showDepartHour:boolean = false;
  showArriveHour:boolean = false;
  showQuote:boolean = false;
  showDetailedForm:boolean = false;
  @Output() public showHourEvent = new EventEmitter();
  @Output() public toggleShowDetailedForm = new EventEmitter();


  constructor(private reservationService:ReservationService, private authService:AuthService, private siteService:SiteService, private router:Router,private http: HttpClient) {
    this.authService.getAuthState().subscribe((newState) => {
      this.isAuthenticated = newState
    });
  }

  ngOnInit(): void {
    this.services = [
      {name : "RELOCATION"}
    ]

    // get sites
    this.siteService.getSites().subscribe(
      (response) => {
                 this.cities = response;
                 this.reservationService.updateDepartSitesState(this.cities);
      });



      this.reservationForm = new FormGroup({
        departureSite : new FormControl(null, [
          Validators.required,
          ],
        ),
        arrivalSite: new FormControl(null,[
          Validators.required,
          ],),
        departureDate: new FormControl(null,[
          Validators.required
          ],),
        service: new FormControl(null, [
        ],),
      })

      this.departMinDate = new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );

      this.reservationForm.valueChanges.subscribe(newFormState => {
        console.log(" form state ", newFormState)
        this.reservationService.reservFormSub.next(newFormState);
    })


  }

  onShowDetailedForm(event:any){
    this.showQuote = false;
    this.showDetailedForm = true;
    this.toggleShowDetailedForm.emit(event)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onDateOrSiteChange(){
    // console.log(" form ", this.reservationForm)
    if(!this.departureSite?.value || !this.departureDate?.value){
       return;
    }

    this.showDepartHour = true;
    this.showArriveHour = true;
    this.showHourEvent.emit(true);

    let i = 0, start = 6;
    let intervals = [0, 15, 30, 45];
    let hour = start;
    while(hour <= 24){
      if(hour <= 9) this.departureHours.push( i == 0 ? `0${hour}:${intervals[i]}0` : `0${hour}:${intervals[i]}`);
      else this.departureHours.push( i == 0 ? `${hour}:${intervals[i]}0` : `${hour}:${intervals[i]}`);

      if(i == intervals.length - 1) {
          hour++;
          i = 0;
      } else i++;
    }
    this.arrivalHours = this.departureHours;

  }


  onFormSubmit(event:any){

    if(this.showDetailedForm){
      this.onSubmit(event);

    } else {
      this.showQuote = true;
    }
  }

  onSubmit(event:any) {
    console.log("Selected Services:", this.selectedServices);
    console.log("Form Data:", this.reservationForm.value);
    this.completedReservation = {
       form: this.reservationForm.value,
       services: this.selectedServices
    }

    this.isLoading = true;
    this.reservationService.saveReservation(this.reservationForm.value).subscribe(
      {
        next: (resp:any) => {
          this.http
            .post(
              `${API_URL}/reservations`,{
                "errandId" : resp.id
              } , {headers : new HttpHeaders({
                  'Content-Type': 'application/json'
                })}
            ).subscribe({
              next: () => {
                alert("La réservation a été sauvegardée avec succès !");
                window.location.href = '/home';
              },
              error: (error: any) => {
                console.error("Erreur lors de la sauvegarde de la réservation :", error);

              }
          })

          console.log("Response from API:", resp);
          console.log("data ", resp );
          if(resp.status == 201){
            this.onSuccess();
            // Alert
          }
        },
        error: (err: any) => {
          console.error("Error from API:", err);
          this.onError()
        }
      }).add(() => {
        this.isLoading = false;
      });
  }

  onSuccess(){
    this.isSuccess = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }

  onError(){
    this.isSuccess = false;
    alert("Merci de sélectionner un point de ")
  }


  scrollToElement($element:any){
    $element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  get departureSite (){ return this.reservationForm.get('departureSite')};
  get arrivalSite (){ return this.reservationForm.get('arrivalSite')};
  get departureDate (){ return this.reservationForm.get('departureDate')};
  get service() {return this.reservationForm.get('service')};

  onSelectCamion(id: string) {
    // this.listUsers = [];

      this.listUsers.push({
        username: "ahmed"+id,
        adress: "adress"+id,
        tele: "07878787"+id,
        role: "provider"+id,
        image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        selected:false
      })
  }
}
