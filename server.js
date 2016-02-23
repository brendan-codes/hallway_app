var express    = require('express'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    fs         = require('fs'),
    app        = express();

app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/images')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
require('./server/config/sync.js');
require('./server/config/routes.js')(app);

var server = app.listen(8000, function(){
  console.log('listening on 8000');
})
