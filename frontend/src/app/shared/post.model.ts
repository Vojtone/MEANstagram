import {Comment} from './comment.model';
import {User} from './user.model';

export class Post {
  constructor(public user: string,
              public photoUrl: string,
              public description: string,
              public creationDate: Date,
              public likedBy: string[],
              public comments: Comment[]) { }
}
