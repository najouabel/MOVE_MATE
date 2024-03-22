import { LocalStorageService } from 'src/app/services/auth/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-drop-down',
  templateUrl: './language-drop-down.component.html',
  styleUrls: ['./language-drop-down.component.css']
})
export class LanguageDropDownComponent implements OnInit {
  lang!:string;
  isShowLang = false;
  constructor(private localStorageService:LocalStorageService, private translateService:TranslateService) { }

  ngOnInit(): void {
    this.lang = this.localStorageService.get("lang") || "fr";
  }


  onLangChange(value:any){
    // console.log(" event ", event.target.value)
    this.localStorageService.set("lang", value);
    window.location.reload();
  }

  showLangMenu(){
    console.log("inside show lang")
    this.isShowLang = !this.isShowLang;
    console.log("show ", this.isShowLang)
  }


}
