// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

var response = {}
/*app.get("/api/timestamp/:date", function(req, res){
  let input = req.params.date
  if(input.includes("-")){
    response["unix"] = new Date(input).getTime()
    response["utc"] = new Date(input).toUTCString();
  } else {
    input = parseInt(input)
    response["unix"] = new Date(input).getTime();
    response["utc"] = new Date(input).toUTCString();
  }
  res.json(response)
}) */
app.get("/api/:date", function(req, res){
  let input = req.params.date
  let integerReg= /^\d+$/;
  if(input.includes("-")){
    response["unix"] = new Date(input).getTime()
    response["utc"] = new Date(input).toUTCString();
  }else {
    input = parseInt(input)
    response["unix"] = new Date(input).getTime();
    response["utc"] = new Date(input).toUTCString();
  }
  /*check for validity*/
  if(!response["unix"] || !response["utc"]){
    res.json({error: "Invalid Date"})
  }
  res.json(response)
})
app.get("/api/", function(req, res){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    response["unix"] = new Date().getTime();
    response["utc"] = new Date().toUTCString();
  
  res.json(response)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


