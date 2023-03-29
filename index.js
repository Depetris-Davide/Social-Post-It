let express = require('express');
let path = require('path');
let fs = require('fs')
let bodyParser = require('body-parser')
let data = require('./data/data.json');
let app = express();
let myLibrary = require('./myDepetrisCafa.js')

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.render('pages/index', {
    titoloJSON: "Home",
    currentPage: "Home"
  });
});
app.get('/postit', function(req, res) {

  data = myLibrary.readFileParsed('./data/data.json')
  dataString = myLibrary.readFile('./data/data.json')
  res.render('pages/postit', {
    data: data,
    dataString: dataString,
    titoloJSON: "Post It",
    currentPage: "Post It"
  });
});

app.post('/scrivi', function(req, res) {

  let dataJSON = JSON.parse(fs.readFileSync('./data/data.json', 'utf8', function(err) {
    if (err) {
      console.log(err)
    }
  }))

  let link = req.body.link

  if (link == "") {
    link = 'https://static.vecteezy.com/ti/vettori-gratis/p1/2205989-icona-profilo-utente-vettoriale.jpg'
  }

  let postit = {
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    liked: "false",
    likes: "0",
    link: link
  }

  myLibrary.addElementToJSON(dataJSON, postit)

  myLibrary.writeFileJSON('./data/data.json', dataJSON)

  res.redirect('/postit');
});

app.post('/update-json', function(req, res) {

  myLibrary.writeFileJSON('./data/data.json', req.body)

  res.redirect('/postit');
});

app.listen(8080);
