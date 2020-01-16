const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

// global constants
var type;
var size;
const PF_SECRET = process.env.PETFINDER_SECRET; // accesses private  secret stored in .env
const API_KEY = 0;
const url_pf_token = "https://api.petfinder.com/v2/oauth2/token";
const fetchData = {
  body:
    "grant_type=client_credentials&client_id=ZGOIlBYDVeFadR6aFGs6O2vCXxoiEbOnxATUiAYFvzImT1JhnH&client_secret=jZvcnQmNylnUG0xrQ5vZYX9x6kA2q4uosB8CfnfF",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
};

const url_pf_breeds = "https://api.petfinder.com/v2/types/dog/breeds";
const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

// Logging for each request
app.use((req, resp, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  console.log(m);
  next();
});

var accessToken;

// tells server to access static pages in public folder
app.use(express.static("public"));

// tell server to listen for requests
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// Handle requests for the data
// http://expressjs.com/en/starter/basic-routing.html
app.get("/breeds/", getAccessToken);
app.get("/breeds", getAccessToken);
app.get("/animals/", getAccessToken);
app.get("/animals/:type/animals/:size", foo);
app.get("/v2/", getURL);

function foo(req, resp) {
  console.log(req.params);
  type = req.params.type;
  size = req.params.size;
  console.log("type is: " + type);
  console.log("size is: " + size);
  fetch(url_pf_token, fetchData)
    .then(fresp => fresp.json())
    .then(function(data) {
      return getAnimalType(data.access_token);
    })
    .then(data => resp.json(data))
    .catch(err => {
      console.error(" Pet Finder API Error:", err.message);
      resp.send("Pet Finder api error");
    });
}

function getAccessToken(req, resp) {
  fetch(url_pf_token, fetchData)
    .then(fresp => fresp.json())
    .then(function(data) {
      return getAnimalType(data.access_token);
    })
    .then(data => resp.json(data))
    .catch(err => {
      console.error(" Pet Finder API Error:", err.message);
      resp.send("Pet Finder api error");
    });
}

function getURL(req, resp) {
  console.log("we're in");
  console.log(type + size);
  return fetch(
    "https://api.petfinder.com/v2/animals?type=" + type + "&size=" + size,
    {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }
  )
    .then(fresp => fresp.json())
    .catch(function(error) {
      //console.log("Error with Pet Finder Dog Breeds: " + error);
    });
}

function getAnimalType(accessToken) {
  console.log("we're in");
  console.log(type + size);
  return fetch(
    "https://api.petfinder.com/v2/animals?type=" + type + "&size=" + size,
    {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }
  )
    .then(fresp => fresp.json())
    .catch(function(error) {
      //console.log("Error with Pet Finder Dog Breeds: " + error);
    });
} //

function getDogBreeds(accessToken) {
  console.log("we're in too");
  console.log(type + size);
  return fetch(
    "https://api.petfinder.com/v2/animals?type=" + type + "&size=" + size,
    {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    }
  )
    .then(fresp => fresp.json())
    .catch(function(error) {
      console.log("Error with Pet Finder Dog Breeds: " + error);
    });
} //
