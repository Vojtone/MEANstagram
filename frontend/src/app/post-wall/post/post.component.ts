import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';
import {User} from '../../shared/user.model';
import {UsersService} from '../../shared/users.service';
import {PostsService} from '../../shared/posts.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: {content: Post, index: number};
  user: User;
  loggedUser = 'jan';
  loggedUserLikesIt: boolean;

  constructor(private usersService: UsersService,
              private postsService: PostsService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.user = this.usersService.getUser(this.post.content.user);
    this.loggedUserLikesIt = this.post.content.likedBy.includes(this.loggedUser);
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

  toggleLike(post) {
    if (!this.loggedUserLikesIt) {
      this.post.content.likedBy.push(this.loggedUser);
    } else {
      this.post.content.likedBy = this.post.content.likedBy.filter(user => user !== this.loggedUser);
    }
    this.loggedUserLikesIt = !this.loggedUserLikesIt;
    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
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
