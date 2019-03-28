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
    new Post(this.users[0], 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'First post.', new Date(2002, 11, 2), [this.users[3], this.users[2], this.users[1]], [
        new Comment(this.users[1], new Date(2018, 7, 7),
          'Nice photo!', [this.users[2], this.users[3]])
      ]),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '2nd post.', new Date(2015, 1, 15), [], []),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      'First post.', new Date(2015, 1, 15), [], []),
    new Post(this.users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '2 post.', new Date(2018, 5, 25), [], []),
    new Post(this.users[1], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '3 post.', new Date(2019, 2, 18), [], []),
    new Post(this.users[2], 'https://envato-shoebox-0.imgix.net/0226/0b65-b9a9-11e3-9936-b8ca3a6774f8/VS_0047_007.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=800&s=684d125fdea32637ff670f9bd30f3987',
      '4 post.', new Date(2019, 1, 5), [], []),
  ];

  public addPost(post: Post) {
    this.posts.push(post);
  }

  public getAllPosts() {
    return this.posts;
  }
}
