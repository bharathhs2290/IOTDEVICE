var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/iot');
var PORT = process.env.PORT || 3000;


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



var ioDeviceSchema = new mongoose.Schema({
  devID:String,
  temp:Number,
  swtchState:Boolean,
  serialno:Number
});

var iod =mongoose.model('cat',ioDeviceSchema);



//var coldev = new iod({
//
//  devID:'f6876',
//  temp:78,
//  swtchState:true
//
//
//
//});
//
//coldev.save(function(err,cat){
//  if(err){
//    console.log(err);
//  }
//  else{
//    console.log(cat);
//  }
//
//
//});

//iod.create({
//
//  devID:"N8237",
//  temp:58,
//  swtchState:false
//
//},function(err,cat){
// if(err){
//   console.log(err);
// }
//  else{
//   console.log(cat);
// }
//
//});


//iod.find({},function(err,data){
////data._id=1;
////  data.save();
//console.log(data);
//  //data.devID='uuuu';
//  //data.save(function(err,fgy){});
//
//
//});
app.get('/status',function(req,res){
var stngRpl="";
iod.findOne({serialno:5},function(err,found){

  if(found.swtchState==true)
  {
stngRpl='Switched ON';

  }
  else{

    stngRpl='Switched OFF';

  }

  res.render('qwerty',{botplace:stngRpl});


});


});


app.get('/kt',function(req,res){

  var stngRpl="";

  iod.findOne({serialno:5},function(err,found){

    if(found.swtchState==true)
    {

      res.send('Switched ON');
    }
    else{

      res.send('Switched OFF');

    }




  });


console.log('stngRpl');


});

app.get('/Did', function (req, res) {

 var swtState = req.query.swtchState;
  var slno= req.query.serialno;

iod.findOne({serialno:slno},function(err,found){
  found.swtchState=swtState;
  found.save(function(err,result) {
    if (err) {
      console.log(err);
    }
    else {


    console.log('switch state is : ' + found.swtchState);
    res.send('switch state is : ' + found.swtchState);
  }

  });



});
  //console.log(req.query);
  //res.send(req.query.temp);



});
app.get("*",function(req,res){


  res.send('star route hit!!');

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });


}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT);



module.exports = app;
