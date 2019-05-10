export class User {
  constructor(public username: string,
              public profilePhotoUrl: string,
              public description: string,
              public posts: string[],
              public followers: string[],
              public following: string[]) {}
}
