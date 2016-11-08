// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var today = new Date().toISOString().slice(0, 10);



var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",

  }
];


function duplicate () {

for (var i = 0; i < songs.length; i++) {
  if (songs[i].artist == newSong.artist || songs[i].title == newSong.title){
     return true;

    }
  }
  return false;
}

function blankField () {
  for (var i = 0; i < songs.length; i++) {
    if (newSong.artist == "" || newSong.artist == "")
      return true;
  }
  return false;
}


// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  newSong = req.body;

  var isBlankField = blankField(newSong);
  var isDuplicate = duplicate(newSong);

  if (isDuplicate == true || isBlankField == true) {
    res.sendStatus(400);
  } else {
    res.sendStatus(201);
    songs.push(newSong);
  }

  // created new resource

});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
