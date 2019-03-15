import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: {content: Post, index: number};

  constructor() { }

  ngOnInit() {
  }


  showDetail(event) {
    let overlay = this.getIdOfClickedElement(event);
    overlay = this.parseOverlayId(overlay, 6); //TODO: lepsze rozwiazanie niz kombinowanie z id?
    overlay.classList.add('overlay');
  }

  hideDetail(event) {
    let overlay = this.getIdOfClickedElement(event);
    overlay = this.parseOverlayId(overlay, 7);
    overlay.classList.remove('overlay');
  }

  private parseOverlayId(overlay: string, shift: number) { //TODO: lepsza nazwa niz shift?
    const tmp = 'overlay-' + overlay.substr(shift); // 7 bo detail- TODO: stala
    return document.getElementById(tmp);
  }

  private getIdOfClickedElement(event) {
    const target = event.target;
    const idAttr = target.attributes.id;
    return idAttr.nodeValue;
  }
}
