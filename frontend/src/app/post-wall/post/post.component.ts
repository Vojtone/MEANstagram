import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';
import {User} from '../../shared/user.model';
import {Comment} from '../../shared/comment.model';
import {UsersService} from '../../shared/users.service';
import {PostsService} from '../../shared/posts.service';
import {DataStorageService} from '../../shared/data-storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: {content: Post, index: number};
  user: User;
  // loggedUser = 'jan';
  // loggedUser = localStorage.getItem('loggedUsername');
  loggedUsernameSub: Subscription;
  loggedUsername = '';
  loggedUserLikesPost: boolean;
  newComment = '';

  constructor(private usersService: UsersService,
              private postsService: PostsService,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.getLoggedUsername() === '') {
      this.router.navigate(['/']);
    }

    this.user = this.usersService.getUser(this.post.content.user);
    this.loggedUserLikesPost = this.post.content.likedBy.includes(this.loggedUsername);

    this.loggedUsernameSub = this.authService.loggedUsernameChanged
      .subscribe(
        (username: string) => {
          this.loggedUsername = username;
        }
      );
    this.loggedUsername = this.authService.getLoggedUsername();
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

  togglePostLike() {
    if (!this.loggedUserLikesPost) {
      this.post.content.likedBy.push(this.loggedUsername);
    } else {
      this.post.content.likedBy = this.post.content.likedBy
        .filter(user => user !== this.loggedUsername);
    }
    this.loggedUserLikesPost = !this.loggedUserLikesPost;
    this.dataStorageService.updatePost(this.post.content)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  loggedUserLikesComment(comment) {
    return comment.likedBy.includes(this.loggedUsername);
  }

  toggleCommentLike(comment) {
    if (this.loggedUserLikesComment(comment)) {
      comment.likedBy = comment.likedBy.filter(user => user !== this.loggedUsername);
    } else {
      comment.likedBy.push(this.loggedUsername);
    }

    this.dataStorageService.updatePost(this.post.content)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  addNewComment() {
    if (this.newComment === '') {
      alert('Comment can\'t be empty! :(');
      return;
    }

    const newComment = new Comment(this.loggedUsername, new Date(), this.newComment, []);
    this.post.content.comments.push(newComment);
    this.newComment = '';
    this.dataStorageService.updatePost(this.post.content)
      .subscribe(
        (response) => {
          console.log(response);
        }
      ); // TODO: DRY (dSS.updatePost...)
  }

  deleteComment(comment) {
    this.post.content.comments = this.post.content.comments
      .filter(com => com !== comment);
    this.dataStorageService.updatePost(this.post.content)
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
