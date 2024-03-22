import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() elementPerPage: number = 2
  currentPage: number = 1
  totalOfPages: number = 1

  readyData:Array<Array<string>> = []
  keys:Array<string> = []

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.setup()
    this.dashboardService.dataChange.subscribe(() => {
      this.setup()
    })
    console.log(this.readyData, this.totalOfPages)
  }

  private setup() {
    this.setupKeys()
    this.setupValues()
    this.totalOfPages = Math.ceil(this.readyData.length / this.elementPerPage)
  }

  private setupKeys(): void{
    this.keys = Object.keys(this.dashboardService.data[0])
  }

  private setupValues(): void{
    this.readyData = []
    this.dashboardService.data.forEach((object) => {
      let values: string[] = Object.values(object)
      this.readyData.push(values)
    })
  }

  getPage(pageNumber: number): Array<Array<string>>{
    let offset = (pageNumber-1) * this.elementPerPage
    let max = offset + this.elementPerPage
    return this.readyData.slice(offset, max)
  }

  setCurrentPage(number: number): void {
    this.currentPage = number
  }



}
