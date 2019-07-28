import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';
import {Comment} from '../../shared/comment.model';
import {AuthService} from '../../shared/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css']
})
export class PostDetailModalComponent implements OnInit {
  @Input() post;
  loggedUsernameSub: Subscription;
  loggedUsername = '';
  newComment = '';

  constructor(public activeModal: NgbActiveModal,
              private dataStorageService: DataStorageService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getLoggedUsername() === '') {
      this.router.navigate(['/']);
    }

    this.loggedUsernameSub = this.authService.loggedUsernameChanged
      .subscribe(
        (username: string) => {
          this.loggedUsername = username;
        }
      );
    this.loggedUsername = this.authService.getLoggedUsername();
  }

  deletePost(post) {
    this.dataStorageService.deletePost(post)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.type === 1) {
            this.dataStorageService.getPosts();
            this.dataStorageService.getUsers();
            this.activeModal.dismiss();
            this.router.navigate(['/wall']);
          }
        }
      );
  }

  loggedUserLikesPost(post) {
    return post.likedBy.includes(this.loggedUsername);
  }

  togglePostLike(post) {
    if (!this.loggedUserLikesPost(post)) {
      post.likedBy.push(this.loggedUsername);
    } else {
      post.likedBy = post.likedBy.filter(user => user !== this.loggedUsername);
    }

    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  loggedUserLikesComment(comment) {
    return comment.likedBy.includes(this.loggedUsername);
  }

  toggleCommentLike(comment, post) {
    if (this.loggedUserLikesComment(comment)) {
      comment.likedBy = comment.likedBy.filter(user => user !== this.loggedUsername);
    } else {
      comment.likedBy.push(this.loggedUsername);
    }

    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  addNewComment(post) {
    if (this.newComment === '') {
      alert('Comment can\'t be empty! :(');
      return;
    }

    const newComment = new Comment(this.loggedUsername, new Date(), this.newComment, []);
    post.comments.push(newComment);
    this.newComment = '';
    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      ); // TODO: DRY (dSS.updatePost...)
  }

  deleteComment(comment, post) {
    post.comments = post.comments
      .filter(com => com !== comment);
    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

}
