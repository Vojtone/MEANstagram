import {Post} from '../shared/post.model';

export class PostWallService {
  private posts: Post[] = [
    new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', 'First post.'),
    new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '2nd post.'),
  ];

  getPosts() {
    return this.posts.slice();
  }
}
