import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css']
})
export class PostDetailModalComponent implements OnInit {
  @Input() post;

  constructor(public activeModal: NgbActiveModal,
              private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  deletePost(post) {
    this.dataStorageService.deletePost(post)
      .subscribe(
        (response) => {
          console.log(response);
          this.dataStorageService.getPosts();
          this.activeModal.dismiss();
          this.router.navigate(['/']); // TODO: tu prawdopodobnie nie bedzie zbyt dobrze
        }
      );
  }

}
