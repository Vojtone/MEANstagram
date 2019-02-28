import {Post} from './post.model';

export class User {
  constructor(public username: string, public profilePhotoUrl: string, public description: string, public posts: Post[]) {}
}
