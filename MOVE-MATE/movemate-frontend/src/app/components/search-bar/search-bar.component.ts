import { City } from './../../interfaces/City';
import { SiteService } from './../../services/reservation/site.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterOperation } from 'src/app/interfaces/filterOperation';
import { OfferService } from 'src/app/services/offer/offer.service';
import { Service } from 'src/app/interfaces/Service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  cities!:City[]
  services!:Service[];
  filterForm!:FormGroup;
  filterCriteriaObj!:FilterOperation[];

  constructor(private offerService:OfferService, private siteService: SiteService) {
    this.siteService.getSites().subscribe(
        response => this.cities = response
      );
  }

  ngOnInit(): void {
    this.services = this.services = [
      {name : "RELOCATION"}
    ];



    this.filterForm = new FormGroup({
      date: new FormControl(null, [
        // Validators.required,
      ]),
      service: new FormControl(null,[
      // Validators.required,
      ],),
      city: new FormControl(null,[
      // Validators.required,
      ],)
    });

  }

  applySearchFilter(){
    //submit search
    // console.log(" form" , this.filterForm.value)
    this.filterCriteriaObj = [
      {
        key:"date",
        value: this.date,
        operation: ":"
      },
      {
        key:"city",
        value: this.city?.value,
        operation: ":"
      },
      {
        key:"service",
        value: this.service?.value,
        operation: ":"
      },
    ]
    this.offerService.forwardSeachValues(this.filterCriteriaObj);
  }

  clearFilter(){
    this.filterForm.reset();
    this.applySearchFilter();
  }


  get date()  { return this.filterForm.get('date'); }
  get city() { return this.filterForm.get('city'); }
  get service() { return this.filterForm.get('service'); }

}
