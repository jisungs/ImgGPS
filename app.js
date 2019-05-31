//jshint esversion : 6

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const ExifImage = require('exif');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const gpsDataSample = [11,12,13];
var gpsData = [];

app.post('/map', function(req, res){

});

app.get('/', function(req, res){

  const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: gpsDataSample});

  res.send(gpsData);

  try {
     new ExifImage({ image : 'img/IMG_9826.JPG' }, function (error, exifData) {
         if (error)
             console.log('Error: '+error.message);
         else
             console.log(exifData.gps.GPSLatitude[0]);
             const lat = exifData.gps.GPSLatitude;
             const lon = exifData.gps.GPSLongitude;
             //console.log(exifData.gps.GPSLongitude);
             gpsData.push(lat);
             gpsData.push(lon);
              // Do something with your data!
     });
  } catch (error) {
     console.log('Error: ' + error.message);
  }
});


app.listen("3000", function(){
  console.log("Sever is running on port 3000.");
});
