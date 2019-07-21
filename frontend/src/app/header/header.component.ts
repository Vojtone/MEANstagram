import {Component} from '@angular/core';
// import {FB} from '../home/home.component';
declare var FB: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logout() {
    console.log('logout');
  }
}
