var express = require('express');
var app = express();

function User(username, profilePhotoUrl, description, posts, followers, following) {
    this.username = username;
    this.profilePhotoUrl = profilePhotoUrl;
    this.description = description;
    this.posts = posts;
    this.followers = posts;
    this.following = following;
}

app.get("/users", function(req, res){
    var users = [
        new User('jan',
            'https://upload.wikimedia.org/wikipedia/commons/0/05/Orthosiphon_pallidus_%28Jyoti%29_in_Talakona_forest%2C_AP_W_IMG_8284.jpg',
            'Random user description.', [], [], []),
        new User('kuba', '', 'just kuba', [], [], []),
        new User('caty', '', 'just caty', [], [], []),
        new User('que', '', 'quequeuqeuqe', [], [], []),
        new User('fifi', '', 'fiflak', [], [], [])
    ];
    res.send(users);
});

app.listen(8080, function(){
    console.log("Listening at 8080");
});