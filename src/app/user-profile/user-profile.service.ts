import {Post} from '../shared/post.model';
import {User} from '../shared/user.model';

export class UserProfileService {
  private user: User = new User('Jan',
    'https://upload.wikimedia.org/wikipedia/commons/0/05/Orthosiphon_pallidus_%28Jyoti%29_in_Talakona_forest%2C_AP_W_IMG_8284.jpg',
    'Random user description.',
    [new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', 'First post.'),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '2 post.'),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '3 post.'),
      new Post('https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg', '4 post.'),
    ]);

  public getUser() {
    return this.user;
  }
}
