import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/user.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() loggedUser: User;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
