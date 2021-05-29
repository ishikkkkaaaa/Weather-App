//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const { stringify } = require("querystring");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //console.log(req.body.cityName);
  // console.log("post recieved");
  const query = req.body.cityName;
  const apiKey = "5fa72d7ca14aa46005f8976feacc29d7";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";
  https.get(url, function (response) {
    console.log(response);
    response.on("data", function (data) {
      //console.log(data);
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      /*   console.log(temp);
      console.log(weatherDescription); */
      res.write("<h1>The weather is current " + weatherDescription + "</h1>");
      res.write(
        "<h1>The temperature in " +
          req.body.cityName +
          " is " +
          temp +
          " degree Celcius</h1> "
      );

      res.write("<img src='" + imgURL + "'/>");
      //we can use multiple res.write but only one
      res.send();
    });
  });
  //res.send("Server is up and running");
});
app.listen(4000, function () {
  console.log("Server is running at port 3000");
});
