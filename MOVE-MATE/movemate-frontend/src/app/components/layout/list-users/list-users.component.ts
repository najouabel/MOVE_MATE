import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../interfaces/user";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @Input() users: Array<User> =[];
  @Output() userSelected: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }


  ngOnInit(): void {
  }

  onuserAdd(user: User) {
    user.selected = !user.selected;
    this.userSelected.emit(user);

  }
}
