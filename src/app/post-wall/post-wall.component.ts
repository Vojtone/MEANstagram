import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post-wall',
  templateUrl: './post-wall.component.html',
  styleUrls: ['./post-wall.component.css']
})
export class PostWallComponent implements OnInit {
  posts: Post[] = [
    new Post('https://upload.wikimedia.org/wikipedia/commons/0/03/Spot-billed_Pelican_%28Pelecanus_philippensis%29_at_nest_with_chicks_in_Uppalpadu_W_IMG_2857.jpg', 'First post.'),
    new Post('https://upload.wikimedia.org/wikipedia/commons/0/03/Spot-billed_Pelican_%28Pelecanus_philippensis%29_at_nest_with_chicks_in_Uppalpadu_W_IMG_2857.jpg', '2nd post.'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
