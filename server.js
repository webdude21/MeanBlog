var express = require('express');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development';
var port = 1234;

var app = express();

app.set("view engine", 'jade');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/partials/:partialName', function (req, res) {
    res.render('/partials/' + req.params.partialName)

});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port);
console.log('Server listening on port: ' + port);