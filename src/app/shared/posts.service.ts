import {Post} from './post.model';
import {Comment} from './comment.model';
import {User} from './user.model';
import {UsersService} from './users.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PostsService {
  constructor(private usersService: UsersService) {}

  private users: User[] = this.usersService.getAllUsers();

  private posts: Post[] = [
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      'First post.', new Date(2002, 11, 2), [], [
        new Comment(new User('pete', '', 'peete', [], [], []),
          new Date(2018, 7, 7), 'Nice photo!', [])
      ]),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '2nd post.', new Date(2015, 1, 15), [], []),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      'First post.', new Date(2015, 1, 15), [], []),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '2 post.', new Date(2018, 5, 25), [], []),
    new Post(this.users[1], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '3 post.', new Date(2019, 2, 18), [], []),
    new Post(this.users[2], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '4 post.', new Date(2019, 1, 5), [], []),
  ];

  public addPost(post: Post) {
    this.posts.push(post);
  }

  public getAllPosts() {
    return this.posts;
  }
}
