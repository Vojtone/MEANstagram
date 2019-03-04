import {Post} from '../shared/post.model';
import {User} from '../shared/user.model';
import {Subject} from 'rxjs';

export class UserProfileService {

  private user: User = new User('Jan',
    'https://upload.wikimedia.org/wikipedia/commons/0/05/Orthosiphon_pallidus_%28Jyoti%29_in_Talakona_forest%2C_AP_W_IMG_8284.jpg',
    'Random user description.',
    [new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', 'First post.', new Date(2015, 1, 15), 0, []),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '2 post.', new Date(2018, 5, 25), 0, []),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '3 post.', new Date(2019, 2, 18), 0, []),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '4 post.', new Date(2019, 1, 5), 0, []),
    ],
    [
      new User('Kuba', '', 'just kuba', [], [], []),
      new User('Caty', '', 'just caty', [], [], []),
    ],
    [
      new User('Que', '', 'quequeuqeuqe', [], [], []),
      new User('Fifi', '', 'fiflak', [], [], []),
    ]);

  public getUser() {
    return this.user;
  }

  public addPost(post: Post) {
    this.user.posts.push(post);
  }
}
