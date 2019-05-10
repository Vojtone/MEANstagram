import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';
import {User} from '../../shared/user.model';
import {UsersService} from '../../shared/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: {content: Post, index: number};
  user: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.usersService.getUser(this.post.content.user);
  }


  showDetail(event) {
    let overlay = this.getIdOfClickedElement(event);
    overlay = this.parseOverlayId(overlay, 6); // TODO: lepsze rozwiazanie niz kombinowanie z id?
    overlay.style.display = 'block';
    overlay.classList.add('detailed-view');
  }

  hideDetail(event) {
    let overlay = this.getIdOfClickedElement(event);
    overlay = this.parseOverlayId(overlay, 7); // 7 bo detail- TODO: magic number here
    overlay.style.display = 'none';
    overlay.classList.remove('detailed-view');
  }

  private parseOverlayId(overlay: string, shift: number) { // TODO: lepsza nazwa niz shift?
    const tmp = 'overlay-' + overlay.substr(shift);
    return document.getElementById(tmp);
  }

  private getIdOfClickedElement(event) {
    const target = event.target;
    const idAttr = target.attributes.id;
    return idAttr.nodeValue;
  }
}
