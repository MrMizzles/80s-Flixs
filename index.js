const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const path = require("path");
const http = require("http");
const url = require("url");
const { create } = require("domain");
app = express();

app.use(bodyParser.json());

let users = [
  {
    id: "1",
    name: "Marshall",
    favoriteMovies: ["Raiders of the Lost Ark"],
  },
];

let movies = [
  {
    title: "Raiders of the Lost Ark",
    year: "1981",
    genre: { Name: "Action/Adventure" },
    plot: "A globetrotting archaeologist and college professor vying with Nazi German forces to recover the long-lost Ark of the Covenant which is said to make an army invincible. Teaming up with his tough former romantic interest Marion Ravenwood (Karen Allen), Indiana Jones races to stop rival archaeologist Dr. René Belloq (Paul Freeman) from guiding the Nazis to the Ark and its power.",
    duration: "115 mins",
    director: { Name: "Steven Spielberg" },
    screenwriter: "Lawrence Kasdan",
    cast: "Harrison Ford, Karen Allen, Paul Freeman, Ronald Lacey, John Rhys-Davies, Denholm Elliott, Alfred Molina, Wolf Kahler",
  },
  {
    title: "Platoon",
    year: "1981",
    genre: { Name: "War" },
    plot: "The film, based on Stone's experience from the war, follows a U.S. Army volunteer (Sheen) serving in Vietnam while his Platoon Sergeant and his Squad Leader (Berenger and Dafoe) argue over the morality in the platoon and of the war itself.",
    duration: "120 minutes",
    director: { Name: "Oliver Stone" },
    screenwriter: "Oliver Stone",
    cast: "Tom Berenger, Willem Dafoe, Charlie Sheen",
  },
  {
    title: "Escape From New York",
    year: "1981",
    genre: { Name: "Science Fiction/Action" },
    plot: "Set in the near-future world of 1997, concerns a crime-ridden United States, which has converted Manhattan Island in New York City into the country's sole maximum security prison. Air Force One is hijacked by anti-government insurgents who deliberately crash it into the walled borough. Ex-soldier and current federal prisoner Snake Plissken (Russell) is given just 24 hours to go in and rescue the President of the United States, after which, if successful, he will be pardoned.",
    duration: "99 minutes",
    director: { Name: "John Carpenter" },
    screenwriter: "John Carpenter",
    cast: "Kurt Russell, Lee Van Cleef, Ernest Borgnine, Donald Pleasence, Isaac Hayes, Harry Dean Stanton, Adrienne Barbeau",
  },
  {
    title: "Ghostbusters",
    year: "1984",
    genre: { Name: "Comedy" },
    plot: "three eccentric parapsychologists who start a ghost-catching business in New York City.",
    duration: "105 minutes",
    director: { Name: "Ivan Reitman" },
    screenwriter: "Dan Aykroyd, Harold Ramis",
    cast: "Bill Murray, Dan Aykroyd, Sigourney Weaver, Harold Ramis, Rick Moranis",
  },
  {
    title: "Lethal Weapon",
    year: "1987",
    genre: { Name: "Buddy Cop/Action/Comedy" },
    plot: "A pair of mismatched LAPD detectives, Martin Riggs, a former Green Beret who has become suicidal following the death of his wife and veteran officer and family man Roger Murtaugh work together as partners.",
    duration: "112 minutes",
    director: { Name: "Richard Donner" },
    screenwriter: "Shane Black",
    cast: "Mel Gibson, Danny Glover, Gary Busey",
  },
  {
    title: "Die Hard",
    year: "1988",
    genre: { Name: "Action" },
    plot: "Die Hard follows New York City police detective John McClane, who is caught up in a terrorist takeover of a Los Angeles skyscraper while visiting his estranged wife.",
    duration: "132 minutes",
    director: { Name: "John McTiernan" },
    screenwriter: "Jeb Stuart, Steven E. de Souza",
    cast: "Bruce Willis, Alan Rickman, Alexander Godunov, Bonnie Bedelia",
  },
  {
    title: "Stand by Me",
    year: "1986",
    genre: { Name: "Independent/Coming-Of-Age/Comedy-Drama" },
    plot: "the film is set in the fictional town of Castle Rock, Oregon in 1959 and tells a story about four friends who go on a hike to find the dead body of a missing boy.",
    duration: "89 minutes",
    director: { Name: "Rob Reiner" },
    screenwriter: "Bruce A. Evans, Raynold Gideon",
    cast: "Wil Wheaton, River Phoenix, Corey Feldman, Jerry O'Connell, Kiefer Sutherland",
  },
  {
    title: "The Thing",
    year: "1982",
    genre: { Name: "Science-Fiction/Horror" },
    plot: 'it tells the story of a group of American researchers in Antarctica who encounter the eponymous "Thing", an extraterrestrial life-form that assimilates, then imitates, other organisms. The group is overcome by paranoia and conflict as they learn that they can no longer trust each other and that any of them could be the Thing.',
    duration: "109 minutes",
    director: { Name: "John Carpenter" },
    screenwriter: "Bill Lancaster",
    cast: "Kurt Russell, Wilford Brimley, T.K. Carter, David Clennon, Keith David, Richard Dysart, Charles Hallahan, Peter Maloney",
  },
  {
    title: "Back to the Future",
    year: "1985",
    genre: { Name: "Science-Fiction" },
    plot: 'a teenager accidentally sent back to 1955 in a time-traveling DeLorean automobile built by his eccentric scientist friend Emmett "Doc" Brown (Lloyd), where he inadvertently prevents his future parents from falling in love threatening his own existence.  He is forced to reconcile them and somehow get back to the future.',
    duration: "115 minutes",
    director: { Name: "Robert Zemeckis" },
    screenwriter: "Robert Zemeckis, Bob Gale",
    cast: "Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover",
  },
  {
    title: "The Terminator",
    year: "1984",
    genre: { Name: "Science-Fiction/Action" },
    plot: "Disguised as a human, a cyborg assassin known as a Terminator (Arnold Schwarzenegger) travels from 2029 to 1984 to kill Sarah Connor (Linda Hamilton). Sent to protect Sarah is Kyle Reese (Michael Biehn), who divulges the coming of Skynet, an artificial intelligence system that will spark a nuclear holocaust.",
    duration: "107 minutes",
    director: { Name: "James Cameron" },
    screenwriter: "James Cameron, Gale Anne Hurd",
    cast: "Arnold Schwarzenegger, Michael Biehn, Linda Hamilton, Paul Winfield",
  },
];

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// Sets up Logger
app.use(morgan("combined", { stream: accessLogStream }));

// This Serves the statics files in the "public" folder
app.use(express.static("public"));

// Get requests

// Returns welcome message

app.get("/", (req, res) => {
  res.send("Welcome to 80's Flix!");
});

// Returns API documentation

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// CREATE. Create a new user

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users need names!");
  }
});

// UPDATE. Update username

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

// DELETE.  Unregister user

app.delete("/users/:id/", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`User ${id} has been deleted`);
  } else {
    res.status(400).send("No such user");
  }
});

// POST.  Update user's favorite movie list

app.put("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added ${id}'s array`);
  } else {
    res.status(400).send("Movie was not added");
  }
});

// DELETE. Delete user movie

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).send(`${movieTitle} has been removed ${id}'s array`);
  } else {
    res.status(400).send("Movie was not removed");
  }
});

// READ. Returns list of movies

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ. Returns a list of movies

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ. Returns data about movie by title

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie!");
  }
});

// READ. Return a director by name

app.get("/movies/directors/:director", (req, res) => {
  movies.find({ "director.name": req.params.director }).then((movies) => {
    res.status(201).json(movie.director);
    return movies.director === req.params.director;
  });
});

// READ. Return a genre by name

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.Name === genreName).genre;

  if (genre) {
    return res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre!");
  }
});

// READ. Return a director data by name

app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.Name === directorName
  ).director;

  if (director) {
    return res.status(200).json(director);
  } else {
    res.status(400).send("No such director!");
  }
});

// Creating error-handling that log all errors to terminal
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke Bro!");
});

// Listens for requests
app.listen(8080, () => {
  console.log("80s Flixs app is listening on port 8080");
});

//http.createServer((request, response) => {
// let requestURL = url.parse(request.url, true);
// if (requestURL.pathname == '/documentation.html'); {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Documentation on the 80s Flixs API.\n');
// } else {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Welcome to the 80s Flixs API!');
// }

// }).listen(8080);
