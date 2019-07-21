var express = require('express');

var app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function User(username, profilePhotoUrl, description, posts, followers, following, fbUserID) {
    this.username = username;
    this.profilePhotoUrl = profilePhotoUrl;
    this.description = description;
    this.posts = posts;
    this.followers = followers;
    this.following = following;
    this.fbUserID = fbUserID
}

function Post(id, user, photoUrl, description, creationDate, likedBy, comments) {
    this.id = id;
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
        'Random user description.', ['0', '1', '2', '3'], ['1', '2', '3'], ['1'], '1'),
    new User('kuba', '', 'just kuba', ['4'], ['0'], ['0'], '2'),
    new User('caty', '', 'just caty', ['5'], [], ['0'], '3'),
    new User('que', '', 'quequeuqeuqe', [], [], ['0'], '4'),
    new User('fifi', '', 'fiflak', [], [], [], '5'),
    // new User('W', '', 'w', [], [], [], '2857240264347866')
];

var posts = [
    new Post('0','jan', 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'First post.', new Date(2002, 11, 2), ['que', 'caty', 'kuba'], [
        new Comment('kuba', new Date(2018, 7, 7), 'Nice photo!', ['caty', 'que']),
        new Comment('fifi', new Date(2019, 2, 3), 'Najs!', ['que', 'jan'])
    ]),
    new Post('1','jan', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '2nd post.', new Date(2015, 1, 15), [], []),
    new Post('2','jan', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    'First post.', new Date(2015, 1, 15), [], []),
    new Post('3','jan', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '2 post.', new Date(2018, 5, 25), [], []),
    new Post('4','kuba', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Terminalia_arjuna_W_IMG_2893.jpg',
    '3 post.', new Date(2019, 2, 18), [], []),
    new Post('5','caty', 'https://envato-shoebox-0.imgix.net/0226/0b65-b9a9-11e3-9936-b8ca3a6774f8/VS_0047_007.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=800&s=684d125fdea32637ff670f9bd30f3987',
    '4 post.', new Date(2019, 1, 5), [], [])
];

app.get("/users", function(req, res){
    // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(users);
});

app.post("/users", function(req, res){
    console.log(req.body);
    const fbUserID = req.body.fbUserID;
    const newUser = req.body.newUser;

    if (users.filter((user) => user.username === newUser.username).length > 0) {
        res.send({status: false, msg: 'This username already exists'});
    } else if (users.filter((user) => user.fbUserID === fbUserID).length > 0) {
        res.send({status: false, msg: 'This fb account is already assigned to an account'});
    } else {
        users.push(new User(newUser.username, newUser.profilePhotoUrl, newUser.description,
            [], [], [], fbUserID));
        res.send({status: true});
    }
});

app.post('/users/fbCheck', function(req, res){
    var fbUserId = req.body.fbUserId;
    for (var i=0; i<users.length; i++) {
        if (users[i].fbUserID === fbUserId) {
            res.send(true);
        } else if (i === users.length-1) {
            res.send(false);
        }
    }
});

app.get("/posts", function(req, res){
    // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(posts);
});

app.post('/posts', function(req, res){

    const id = Math.floor(Math.random() * Number.MAX_VALUE) + '';

    const np = req.body;

    const username = np.user;
    const photoUrl = np.photoUrl;
    const description = np.description;
    const creationDate = np.creationDate;
    const likedBy = np.likedBy;
    const comments = np.comments;

    // TODO: remove body-parser from package.json

    // add post to posts
    posts.push(new Post(id, username, photoUrl, description, creationDate, likedBy, comments));

    // add postID to user
    for (var i=0; i<users.length; i++) {
        if (users[i].username === username) {
            users[i].posts.push(id);
        }
    }
});

app.put('/posts/:id', function(req, res) {
    const id = req.params.id;
    for (var i=0; i<posts.length; i++) {
        if (posts[i].id === id) {
            posts[i] = req.body;
            break;
        }
    }
});

app.delete('/posts', function(req, res){
    const np = req.body;
    const id = np.id;
    const username = np.user;

    // remove postID from user
    for (var i=0; i< users.length; i++) {
        if (users[i].username === username) {
            users[i].posts = users[i].posts.filter(postId => postId !== id);
            break;
        }
    }
    // remove post from posts
    posts = posts.filter(post => post.id !== id);
});

app.listen(8080, function(){
    console.log("Listening at 8080");
});