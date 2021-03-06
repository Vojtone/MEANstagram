import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/user.model';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../shared/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() loggedUsername: User;
  @Input() user: User;
  constructor(private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
  }

}
