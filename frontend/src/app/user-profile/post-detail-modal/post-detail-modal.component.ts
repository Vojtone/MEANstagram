import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';
import {Comment} from '../../shared/comment.model';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css']
})
export class PostDetailModalComponent implements OnInit {
  @Input() post;
  loggedUser = 'jan';
  newComment = '';

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
          this.dataStorageService.getUsers();
          this.activeModal.dismiss();
          this.router.navigate(['/wall']);
        }
      );
  }

  loggedUserLikesPost(post) {
    return post.likedBy.includes(this.loggedUser);
  }

  togglePostLike(post) {
    if (!this.loggedUserLikesPost(post)) {
      post.likedBy.push(this.loggedUser);
    } else {
      post.likedBy = post.likedBy.filter(user => user !== this.loggedUser);
    }

    this.dataStorageService.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  loggedUserLikesComment(comment) {
    return comment.likedBy.includes(this.loggedUser);
  }

  toggleCommentLike(comment, post) {
    if (this.loggedUserLikesComment(comment)) {
      comment.likedBy = comment.likedBy.filter(user => user !== this.loggedUser);
    } else {
      comment.likedBy.push(this.loggedUser);
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

    const newComment = new Comment(this.loggedUser, new Date(), this.newComment, []);
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
