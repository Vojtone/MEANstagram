import {User} from './user.model';

export class Comment {
  constructor(public user: User,
              public creationDate: Date,
              public content: string,
              public likedBy: User[]) { }
}
