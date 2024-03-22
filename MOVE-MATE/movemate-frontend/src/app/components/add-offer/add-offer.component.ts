import { OfferService } from 'src/app/services/offer/offer.service';
import { SiteService } from './../../services/reservation/site.service';
import { City } from './../../interfaces/City';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/Service';
import { Mean } from 'src/app/interfaces/Mean';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  addOfferForm!:FormGroup;
  cities!:City[];
  services!:Service[];
  means!:Mean[];
  animationSrc:string = "";

  isSuccess:boolean = false;
  isAddingOfferResult:boolean = false;

  constructor(private router:Router, private siteService:SiteService, private offerService:OfferService) { }

  ngOnInit(): void {
    this.services = [
      {name : "RELOCATION"}
    ]
    this.means = [
      {name : "BIG_CAMION"},
      {name : "SMALL_CAMION"},
      {name : "MOYEN_CAMION"}
    ]
    // get sites
    this.siteService.getSites().subscribe((response) => {
                 this.cities = response;
      });

    this.addOfferForm = new FormGroup({
      from : new FormControl(null,[
        Validators.required,
        ],
      ),
      to: new FormControl(null, [
        Validators.required
      ]
      ),
      meantype: new FormControl(null,[
        Validators.required,
        ],),
      service: new FormControl(null,[
        Validators.required,
        ],),
    })
  }

  onSubmit(event:any) {
    this.offerService.saveOffer(this.addOfferForm.value).subscribe(
      {
        next: resp => {
          this.isSuccess = true;
        },
        error: err => {
          this.isSuccess = false
        }
      }).add(() => {
        this.displayCompletionAnimation();
      });
  }



  displayCompletionAnimation(){
    if(this.isSuccess) this.animationSrc = "https://assets3.lottiefiles.com/packages/lf20_lk80fpsm.json";
    else this.animationSrc = "https://assets9.lottiefiles.com/packages/lf20_q9ik4qqj.json";
    this.isAddingOfferResult = true;

    setTimeout(()=> {
      this.isAddingOfferResult = false;
      this.router.navigate(['/dashboard/provider'])
              .then(() => {
                window.location.reload();
            });
    }, 1500);
  }


  get from (){ return this.addOfferForm.get('from')};
  get to (){ return this.addOfferForm.get('to')};
  get meantype (){ return this.addOfferForm.get('meantype')};
  get service (){ return this.addOfferForm.get('service')};

}
