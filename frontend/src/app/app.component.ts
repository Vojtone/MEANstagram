import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MEANstagram';

  constructor(public dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getUsers();
    this.dataStorageService.getPosts();
  }
}
