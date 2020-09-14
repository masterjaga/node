// create express server variables
var express = require('express');
var app = express();

// create file system variables
var fs = require('fs');
const path = require('path');

app.get('/', function (req, res) {
   res.send('Hello From Heroku !');
})

// Endpoint to create a text file with curent timestamp in current folder
// Type = GET
app.get('/createFile', function (req, res) {

   let currentTimeStamp = + new Date();
   var date = new Date();
   var timestamp = date.getTime();

   fs.writeFile(currentTimeStamp + '.txt', timestamp, function (err) {
      if (err) {
         console.log(err);
         res.send(err);
      } else {
         console.log('Write operation complete.');
         res.send('Write operation complete.');
      }
   });

})

// Endpoint to get names of all the  text files in current folder
// Type = GET
app.get('/getFiles', function (req, res) {
   console.log("Got a POST request for the files");
   let out = "";
   //out += "<p>"
   fs.readdir(__dirname, (err, files) => {
      if (err) {
         console.log(err);
         res.send(err);
      } else {
         console.log("\nCurrent directory filenames:");
         files.forEach(file => {
            if (path.extname(file) == ".txt") {
               console.log(file);
               out += "\n" + file;
            }
         })
         //out += "</p>";
         res.send(out);
      }
   })
   console.log(out)
})

// start the server with specified port
var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})