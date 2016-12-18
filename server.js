// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
    res.sendFile('/views/index.html', {
        root: __dirname
    });
});

app.get('/api/profile', function profile(req, res) {
    res.json();
});

// Get all games
app.get('/api/games', function getGames(req, res) {
    db.Game.find().exec(function(err, games) {
        if (err) {
            return console.log("Error " + err);
        };
        res.json(games);
    });
});

//Get one game
app.get('/api/games/:id', function gameGet(req, res) {
    db.Game.findOne({
        _id: req.params.id
    }, function(err, game) {
        if (err) {
            return console.log("Error " + err);
        };
        res.json(game);
    });
});

//Create a game
app.post('/api/games', function gameCreate(req, res) {
    var newGame = new db.Game({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.publisher,
        console: req.body.console,
        releaseDate: Date.parse(req.body.releaseDate)
    });
    newGame.save(function(err, game) {
        if (err) {
            return console.log("Error " + err);
        }
        console.log("Saved " + game.title);
        res.json(game);
    });
});

//Edit a game's entry
app.put('/api/games/:id', function gameEdit(req, res) {
    db.Game.findOne({
        _id: req.params.id
    }, function(err, game) {
        if (err) {
            return console.log("Error " + err);
        } else
            game.title = req.body.title
            game.genre = req.body.genre
            game.publisher = req.body.publisher
            game.console = req.body.console
            game.releaseDate = Date.parse(req.body.releaseDate)
            game.save(function(err) {
              if (err) {
                return console.log("Error " + err);
              }
              console.log("Updated " + game);
            });
            res.json(game);
    });
});

//Delete an entry
app.delete('/api/games/:id', function gameEdit(req, res) {
    db.Game.findOneAndRemove({
        _id: req.params.id
    }, function(err, deletedGame) {
        if (err) {
            return console.log("Error " + err);
        }
        res.json(deletedGame)
    });
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
    // TODO: Document all your api endpoints below
    res.json({
        message: "Welcome to my personal api! Here's what you need to know!",
        documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
        baseUrl: "https://blooming-hamlet-27001.herokuapp.com",
        endpoints: [{
            method: "GET",
            path: "/api",
            description: "Describes all available endpoints"
        }, {
            method: "GET",
            path: "/api/profile",
            description: "Data about me"
        }, {
            method: "GET",
            path: "/api/games",
            description: "My favorite games"
        }, {
            method: "GET",
            path: "/api/games/:id",
            description: "Get one of my favorite games"
        }, {
            method: "POST",
            path: "/api/games",
            description: "Create a new favorite game"
        }, {
            method: "PUT",
            path: "/api/games/:id",
            description: "Edits and replaces content of game data"
        }, {
            method: "DELETE",
            path: "/api/games/:id",
            description: "Deletes content of game data"
        }]
    })
});

app.get('/api/profile', function profile(req, res) {
    res.json({
        name: "Alessandro Pianetta",
        githubUsername: "aapiane09",
        githubLink: "https://github.com/aapiane09",
        githubProfileImage: "http://i.imgur.com/1CcLEwm.jpg",
        personalSiteLink: "https://aapiane09.github.io/"
        currentCity: "Concord, CA",
        pet: []
    })
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
