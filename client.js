function optionDisplay(num) {
  var searchOptions = document.getElementById("filterSearch");
  switch (num) {
    case 1:
      searchOptions.className = "unhidden";
      break;
    case 2:
      searchOptions.className = "hidden";
      break;
  } //switch
} //displayOptions

var one = 0;
var two = 1;
var three = 2;
var four = 3;
var five = 4;
var six = 5;
var seven = 6;
var eight = 7;

var type = document.getElementById("animal").value;
var size = document.getElementById("size").value;

var extra =
  "https://cdn.glitch.com/f4bc1f20-9bcc-4a54-b922-08b785a1e344%2FnoImage.svg?v=1576268287944";

function cacheOrWeb() {
  console.log("hi")
  var searchOptions = document.getElementById("filterSearch");
  
  searchOptions.className = "hidden";
  
  type = document.getElementById("animal").value;
  size = document.getElementById("size").value;
  var online = navigator.onLine;
  console.log("hi" + online);
  if (online) {
    let results = getInformation();
    results.then(data => {
      giveInformation(data);
    })
  } else {
    let cache = getDataFromCache();
    cache.then(data => {
console.log("hi im here")
      console.log(data);
      giveInformation(data);
    })
  }
} //cacheOrWeb

function getDataFromCache() {
  console.log("hello hello")
  const url = `https://petfinderpwa-0-1-0.glitch.me/animals/${type}/animals/${size}`;
  //console.log(url);https://petfinderpwa-0-0-7.glitch.me
  if (!("caches" in window)) {
    return null;
  }
  return caches.match(url).then(response => {
    if(response){
      console.log("am i working?")
      return response.json();
    }else{
      document.getElementById("name").innerHTML = "This is an online function";
    }
  }).catch(err => {
      console.error("Error getting data from cache", err);
      return null;
    });
} // getDataFromcache

function getInformation() {
  fetch("/animals/" + type + "/animals/" + size)
    .then(resp => resp.json()) // Transform the data into json
    .then(data => {})
    .catch(function(error) {
      console.log("Error with Pet Finder API: " + error);
    });
  fetch("/animals")
    .then(resp => resp.json()) // Transform the data into json
    .then(data => {
      console.log("data from getInfo " + data);
      giveInformation(data);
    })
    .catch(function(error) {
      //console.log("Error with Pet Finder API: " + error)
    });
} //getInformation

function giveInformation(data) {

  console.log("data is");
  console.log(data);
  document.getElementById("one").className = "card unhidden";
  document.getElementById("name").innerHTML = data.animals[one].name;
  if (data.animals[one].photos[0] == null) {
    document.getElementById("picture").src = extra;
  } else {
    document.getElementById("picture").src = data.animals[one].photos[0].medium;
  } //if...else
  document.getElementById("breed").innerHTML =
    "Breed: " + data.animals[one].breeds.primary;
  document.getElementById("gender").innerHTML =
    "Gender: " + data.animals[one].gender;
  document.getElementById("location").innerHTML =
    "Location: " +
    data.animals[one].contact.address.city +
    ", " +
    data.animals[one].contact.address.state;
  document.getElementById("url").innerHTML =
    "Find " + data.animals[one].name + " on PetFinder!";
  document.getElementById("url").href = data.animals[one].url;

  //end of 1

  document.getElementById("two").className = "card unhidden";
  document.getElementById("name2").innerHTML = data.animals[two].name;
  if (data.animals[two].photos[0] == null) {
    document.getElementById("picture2").src = extra;
  } else {
    document.getElementById("picture2").src =
      data.animals[two].photos[0].medium;
  } //if...else
  document.getElementById("breed2").innerHTML =
    "Breed: " + data.animals[two].breeds.primary;
  document.getElementById("gender2").innerHTML =
    "Gender: " + data.animals[two].gender;
  document.getElementById("location2").innerHTML =
    "Location: " +
    data.animals[two].contact.address.city +
    ", " +
    data.animals[two].contact.address.state;
  document.getElementById("url2").innerHTML =
    "Find " + data.animals[two].name + " on PetFinder!";
  document.getElementById("url2").href = data.animals[two].url;

  //end of 2

  document.getElementById("three").className = "card unhidden";
  document.getElementById("name3").innerHTML = data.animals[three].name;
  if (data.animals[three].photos[0] == null) {
    document.getElementById("picture3").src = extra;
  } else {
    document.getElementById("picture3").src =
      data.animals[three].photos[0].medium;
  } //if...else
  document.getElementById("breed3").innerHTML =
    "Breed: " + data.animals[three].breeds.primary;
  document.getElementById("gender3").innerHTML =
    "Gender: " + data.animals[three].gender;
  document.getElementById("location3").innerHTML =
    "Location: " +
    data.animals[three].contact.address.city +
    ", " +
    data.animals[three].contact.address.state;
  document.getElementById("url3").innerHTML =
    "Find " + data.animals[three].name + " on PetFinder!";
  document.getElementById("url3").href = data.animals[three].url;

  //end of 3

  document.getElementById("four").className = "card unhidden";
  document.getElementById("name4").innerHTML = data.animals[four].name;
  if (data.animals[four].photos[0] == null) {
    document.getElementById("picture4").src = extra;
  } else {
    document.getElementById("picture4").src =
      data.animals[four].photos[0].medium;
  } //if...else
  document.getElementById("breed4").innerHTML =
    "Breed: " + data.animals[four].breeds.primary;
  document.getElementById("gender4").innerHTML =
    "Gender: " + data.animals[four].gender;
  document.getElementById("location4").innerHTML =
    "Location: " +
    data.animals[four].contact.address.city +
    ", " +
    data.animals[four].contact.address.state;
  document.getElementById("url4").innerHTML =
    "Find " + data.animals[four].name + " on PetFinder!";
  document.getElementById("url4").href = data.animals[four].url;

  //end of 4

  document.getElementById("five").className = "card unhidden";
  document.getElementById("name5").innerHTML = data.animals[five].name;
  if (data.animals[five].photos[0] == null) {
    document.getElementById("picture5").src = extra;
  } else {
    document.getElementById("picture5").src =
      data.animals[five].photos[0].medium;
  } //if...else
  document.getElementById("breed5").innerHTML =
    "Breed: " + data.animals[five].breeds.primary;
  document.getElementById("gender5").innerHTML =
    "Gender: " + data.animals[five].gender;
  document.getElementById("location5").innerHTML =
    "Location: " +
    data.animals[five].contact.address.city +
    ", " +
    data.animals[five].contact.address.state;
  document.getElementById("url5").innerHTML =
    "Find " + data.animals[five].name + " on PetFinder!";
  document.getElementById("url5").href = data.animals[five].url;

  //end of 5

  document.getElementById("six").className = "card unhidden";
  document.getElementById("name6").innerHTML = data.animals[six].name;
  if (data.animals[six].photos[0] == null) {
    document.getElementById("picture6").src = extra;
  } else {
    document.getElementById("picture6").src =
      data.animals[six].photos[0].medium;
  } //if...else
  document.getElementById("breed6").innerHTML =
    "Breed: " + data.animals[six].breeds.primary;
  document.getElementById("gender6").innerHTML =
    "Gender: " + data.animals[six].gender;
  document.getElementById("location6").innerHTML =
    "Location: " +
    data.animals[six].contact.address.city +
    ", " +
    data.animals[six].contact.address.state;
  document.getElementById("url6").innerHTML =
    "Find " + data.animals[six].name + " on PetFinder!";
  document.getElementById("url6").href = data.animals[six].url;

  //end of 6

  document.getElementById("seven").className = "card unhidden";
  document.getElementById("name7").innerHTML = data.animals[seven].name;
  if (data.animals[seven].photos[0] == null) {
    document.getElementById("picture7").src = extra;
  } else {
    document.getElementById("picture7").src =
      data.animals[seven].photos[0].medium;
  } //if...else
  document.getElementById("breed7").innerHTML =
    "Breed: " + data.animals[seven].breeds.primary;
  document.getElementById("gender7").innerHTML =
    "Gender: " + data.animals[seven].gender;
  document.getElementById("location7").innerHTML =
    "Location: " +
    data.animals[seven].contact.address.city +
    ", " +
    data.animals[seven].contact.address.state;
  document.getElementById("url7").innerHTML =
    "Find " + data.animals[seven].name + " on PetFinder!";
  document.getElementById("url7").href = data.animals[seven].url;

  //end of 7

  document.getElementById("eight").className = "card unhidden";
  document.getElementById("name8").innerHTML = data.animals[eight].name;
  if (data.animals[eight].photos[0] == null) {
    document.getElementById("picture8").src = extra;
  } else {
    document.getElementById("picture8").src =
      data.animals[eight].photos[0].medium;
  } //if...else
  document.getElementById("breed8").innerHTML =
    "Breed: " + data.animals[eight].breeds.primary;
  document.getElementById("gender8").innerHTML =
    "Gender: " + data.animals[eight].gender;
  document.getElementById("location8").innerHTML =
    "Location: " +
    data.animals[eight].contact.address.city +
    ", " +
    data.animals[eight].contact.address.state;
  document.getElementById("url8").innerHTML =
    "Find " + data.animals[eight].name + " on PetFinder!";
  document.getElementById("url8").href = data.animals[eight].url;
}

function nextPage() {
  one = one + 8;
  two = two + 8;
  three = three + 8;
  four = four + 8;
  five = five + 8;
  six = six + 8;
  seven = seven + 8;
  eight = eight + 8;

  cacheOrWeb();
} //nextPage

function previousPage() {
  if (
    one == 0 &&
    two == 1 &&
    three == 2 &&
    four == 3 &&
    five == 4 &&
    six == 5 &&
    seven == 6 &&
    eight == 7
  ) {
  } else {
    one = one - 8;
    two = two - 8;
    three = three - 8;
    four = four - 8;
    five = five - 8;
    six = six - 8;
    seven = seven - 8;
    eight = eight - 8;
  }

  cacheOrWeb();
} //nextPage

