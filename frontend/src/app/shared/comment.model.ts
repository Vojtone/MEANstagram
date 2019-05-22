import {User} from './user.model';

export class Comment {
  constructor(public user: string,
              public creationDate: Date,
              public content: string,
              public likedBy: string[]) { }
}
