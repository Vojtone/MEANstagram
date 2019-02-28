export class Post {
  public photoUrl: string;
  public description: string;

  constructor(photoUrl: string, description: string) {
    this.photoUrl = photoUrl;
    this.description = description;
  }
}
