var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var port = 1234;

var app = express();

app.set("view engine", 'jade');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/partials/:partialArea/:partialName', function(req, res) {
    res.render('../../public/' + req.params.partialArea + '/' + req.params.partialName)
});

mongoose.connect('mongodb://localhost/MeanBlog');
var db = mongoose.connection;

db.on('error', function(err){
    console.warn(err);
});

db.once('open', function(err, data){
   if (err){
       console.warn(err);
   }else{
       console.log('Database initialized!')
   }

});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port);
console.log('Server listening on port: ' + port);