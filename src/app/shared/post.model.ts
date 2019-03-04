import {Comment} from './comment.model';
import {User} from './user.model';

export class Post {

  constructor(public user: User, public photoUrl: string, public description: string, public creationDate: Date,
              public likedBy: User[], public comments: Comment[]) { }
}
