import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showForm:Boolean = false;
  showTransition:Boolean = false;
  sections: Array<HTMLElement> = []

  constructor( private elementRef: ElementRef<HTMLElement>,
               private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.sections = Array.from(this.elementRef.nativeElement.querySelectorAll('.step'))
  }


  toggleShowForm(){
     this.showForm = !this.showForm;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(!this.showForm){return}
      let steps:Array<HTMLElement> = []
    let service = this.elementRef.nativeElement.querySelector('#service')
    let order = this.elementRef.nativeElement.querySelector('#order')
    let signin = this.elementRef.nativeElement.querySelector('#signin')
    steps.push(<HTMLElement>order,<HTMLElement>service,<HTMLElement>signin)

    steps.forEach((step: HTMLElement) => {
      if(window.scrollY >= step.offsetTop ) {
        console.log(this.reservationService.current)
        this.reservationService.current = step.getAttribute('id') ?? 'order'
      }
    })

  }
}
