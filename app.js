//jshint esversion : 6

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const ExifImage = require('exif');
const date = require(__dirname + "/date.js");
const ejsLint = require('ejs-lint');


const app = express();

app.use("/", express.static(__dirname + '/'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){

  const day = date.getDate();
  //res.render("list", {listTitle: day, newListItems: gpsDataSample});
  var latArray = [12];

  try {
     new ExifImage({ image : 'img/IMG_9826.JPG' }, function (error, exifData) {
         if (error)
             console.log('Error: '+ error.message);
         else
            // console.log(exifData.gps.GPSLatitude);
            var lat = exifData.gps.GPSLatitude;
            latArray.push(lat)
            console.log(lat)
              // Do something with your data!
     });
  } catch (error) {
     console.log('Error: ' + error.message);
  }

  res.render('list',{GPSitem : String(latarray.forEach(function()))});

});

app.post('/map', function(req, res){

});


app.listen("3000", function(){
  console.log("Sever is running on port 3000.");
});
