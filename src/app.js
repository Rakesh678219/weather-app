/** @format */

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");
//handlebar
// defining path for views (overriding default path)
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);
app.set("view engine", "hbs"); //using hbs engine for serving dynamic templates

//serves the static image files
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//partials
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rakesh Peddamallu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rakesh Peddamallu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Sample help text !!",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please enter a place/address" });
  }

  forecast(req.query.address, (error, forecast, location) => {
    if (error) {
      return res.send({ error });
    }
    return res.send({
      forecast: forecast,
      location: location,
      address: req.query.address,
    });
  });
});
app.get("/products", (req, res) => {
  if (!req?.query?.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "404 page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
