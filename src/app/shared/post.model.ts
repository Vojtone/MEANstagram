import {Comment} from './comment.model';

export class Post {

  constructor(public photoUrl: string, public description: string, public creationDate: Date,
              public likes: number, public comments: Comment[]) { }
}
