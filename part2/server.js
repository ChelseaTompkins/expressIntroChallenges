var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');
var path = require("path");

app.post('/create/:name/:age', function(req, res) {
  let jsData = retrieveData();

  var newPerson = {
    "name": req.params.name,
    "age": req.params.age
  }
  jsData.push(newPerson);
  fs.writeFileSync('./part2/storage.json', JSON.stringify(jsData));
  res.json(newPerson);
});

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname+'/storage.json'));
});

app.get("/:name", function(req, res){
  let jsData = retrieveData();
  for(let i=0; i<jsData.length; i++){
    let person = jsData[i];
    if(person.name === req.params.name){
      res.json(person);
      return;
    }
  }
  res.sendStatus(400);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

function retrieveData(){
  let rawData = fs.readFileSync("./part2/storage.json", "utf8");
  let jsData = JSON.parse(rawData);
  return jsData;
}
