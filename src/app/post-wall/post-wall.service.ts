import {Post} from '../shared/post.model';
import {User} from '../shared/user.model';
import {Comment} from '../shared/comment.model';

export class PostWallService {
  private posts: Post[] = [
    new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      'First post.', new Date(2002, 11, 2), 0, [
        new Comment(new User('pete', '', 'peete', [], [], []),
          new Date(2018, 7, 7), 'Nice photo!', 0)
      ]),
    new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
      '2nd post.', new Date(2015, 1, 15), 0, []),
  ];

  getPosts() {
    return this.posts.slice();
  }
}
