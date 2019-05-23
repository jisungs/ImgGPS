//jshint esversion : 6

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const ExifImage = require('exif');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var gpsData = [];

app.post('/map', function(req, res){

});

try {
   new ExifImage({ image : 'img/IMG_9826.JPG' }, function (error, exifData) {
       if (error)
           console.log('Error: '+error.message);
       else
           console.log(exifData.gps.GPSLatitude[0]);
           const lat = exifData.gps.GPSLatitude;
           //console.log(exifData.gps.GPSLongitude);

           gpsData.push(lat);
            // Do something with your data!
   });
} catch (error) {
   console.log('Error: ' + error.message);
}

app.get('/', function(req, res){
  res.send(gpsData);
});

app.listen("3000", function(){
  console.log("Sever is running on port 3000.");
});
