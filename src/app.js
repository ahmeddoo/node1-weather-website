const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utilities/geocode");
const forecast = require("./utilities/forecast");

const app = express();
const port = process.env.PORT;

// Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ahmedoo Mukhtar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ahmedoo Mukhtar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "The help message goes here",
    name: "Ahmedoo Mukhtar",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You have to provide a search string",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmedoo Mukhtar",
    message: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmedoo Mukhtar",
    message: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server Up on port " + port);
});
