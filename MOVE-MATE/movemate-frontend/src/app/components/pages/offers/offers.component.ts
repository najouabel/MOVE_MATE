import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { PaginationInstance } from 'ngx-pagination';
import { FilterOperation } from 'src/app/interfaces/filterOperation'
import { OfferService } from 'src/app/services/offer/offer.service';
import { JwtHandlerService } from 'src/app/services/auth/jwt-handler.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  @Input("getForProvider") getForProvider!:Boolean;
  offers!: Offer[];
  isLoading!:boolean;
  filters!:FilterOperation[];
  userRole!:String;



  constructor(private offerService: OfferService, private jwtService:JwtHandlerService) {

  }


  public filter: string = '';
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 3,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];

  private popped : any = [];


  ngOnInit(): void {
    this.userRole = this.jwtService.getRole()!;

    this.offerService.getSearchValsObser().subscribe(
      val => {
        console.log(" filter inside offers compo constr" , val)
        this.filters = val;
        this.fetchOffers();
      }
    )
    // fetch offers on init
    this.fetchOffers();
  }


  fetchOffers(){
    this.isLoading = true;
    if(!this.getForProvider){
      this.offerService.getOffers(this.filters)
                              .subscribe( (response:any) => {
                                this.offers =  response as Offer[];
                                console.log(this.offers)
                                this.isLoading = false;
                              });
    } else {
      this.offerService.getOffersByProvider()
              .subscribe( (response:any) => {
                                              this.offers =  response as Offer[];
                                              this.isLoading = false;
                                            });
    }
  }

  onPageChange(number: number) {
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
      this.logEvent(`pageBoundsCorrection(${number})`);
      this.config.currentPage = number;
  }

  pushItem() {
      let item = this.popped?.pop()
      this.offers?.push();
  }

  popItem() {
      this.popped?.push(this.offers?.pop());
  }

  private logEvent(message: string) {
      this.eventLog.unshift(`${new Date().toISOString()}: ${message}`)
  }



}
