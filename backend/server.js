var express = require('express');
var util = require('util');

var app = express();

function User(username, profilePhotoUrl, description, posts, followers, following) {
    this.username = username;
    this.profilePhotoUrl = profilePhotoUrl;
    this.description = description;
    this.posts = posts;
    this.followers = followers;
    this.following = following;
}

function Post(user, photoUrl, description, creationDate, likedBy, comments) {
    this.user = user;
    this.photoUrl = photoUrl;
    this.description = description;
    this.creationDate = creationDate;
    this.likedBy = likedBy;
    this.comments = comments;
}

function Comment(user, creationDate, content, likedBy) {
    this.user = user;
    this.creationDate = creationDate;
    this.content = content;
    this.likedBy = likedBy;
}

var users = [
    new User('jan',
        'https://upload.wikimedia.org/wikipedia/commons/0/05/Orthosiphon_pallidus_%28Jyoti%29_in_Talakona_forest%2C_AP_W_IMG_8284.jpg',
        'Random user description.', ["0", "1", "2", "3"], [], []),
    new User('kuba', '', 'just kuba', [], [], []),
    new User('caty', '', 'just caty', [], [], []),
    new User('que', '', 'quequeuqeuqe', [], [], []),
    new User('fifi', '', 'fiflak', [], [], [])
];

var posts = [
    new Post(users[0], 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'First post.', new Date(2002, 11, 2), [users[3], users[2], users[1]], [
      new Comment(users[1], new Date(2018, 7, 7),
        'Nice photo!', [users[2], users[3]])
    ]),
    new Post(users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '2nd post.', new Date(2015, 1, 15), [], []),
    new Post(users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    'First post.', new Date(2015, 1, 15), [], []),
    new Post(users[0], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '2 post.', new Date(2018, 5, 25), [], []),
    new Post(users[1], 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '3 post.', new Date(2019, 2, 18), [], []),
    new Post(users[2], 'https://envato-shoebox-0.imgix.net/0226/0b65-b9a9-11e3-9936-b8ca3a6774f8/VS_0047_007.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=800&s=684d125fdea32637ff670f9bd30f3987',
    '4 post.', new Date(2019, 1, 5), [], [])
];

app.get("/users", function(req, res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(users);
});

app.get("/posts", function(req, res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(posts);
});

app.listen(8080, function(){
    console.log("Listening at 8080");
});