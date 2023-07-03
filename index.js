const express = require('express');
const morgan = require('morgan'); 
const fs = require('fs'); // import built in node modules fs and path
const path = require('path');
const http = require('http');
const url = require('url');
const app = express();

let topMovies = [
    {
        title:'Raiders of the Lost Ark',
        year:'1981',
        plot:'A globetrotting archaeologist and college professor vying with Nazi German forces to recover the long-lost Ark of the Covenant which is said to make an army invincible. Teaming up with his tough former romantic interest Marion Ravenwood (Karen Allen), Indiana Jones races to stop rival archaeologist Dr. René Belloq (Paul Freeman) from guiding the Nazis to the Ark and its power.',
        duration:'115 mins',
        director:'Steven Spielberg',
        screenwriter:'Lawrence Kasdan',
        cast:'Harrison Ford, Karen Allen, Paul Freeman, Ronald Lacey, John Rhys-Davies, Denholm Elliott, Alfred Molina, Wolf Kahler'
    },
    {
        title:'Platoon',
        year:'1981',
        plot:'The film, based on Stone\'s experience from the war, follows a U.S. Army volunteer (Sheen) serving in Vietnam while his Platoon Sergeant and his Squad Leader (Berenger and Dafoe) argue over the morality in the platoon and of the war itself.',
        duration:'120 minutes',
        director:'Oliver Stone',
        screenwriter:'Oliver Stone',
        cast:'Tom Berenger, Willem Dafoe, Charlie Sheen'
    },
    {
        title:'Escape From New York',
        year:'1981',
        plot:'Set in the near-future world of 1997, concerns a crime-ridden United States, which has converted Manhattan Island in New York City into the country\'s sole maximum security prison. Air Force One is hijacked by anti-government insurgents who deliberately crash it into the walled borough. Ex-soldier and current federal prisoner Snake Plissken (Russell) is given just 24 hours to go in and rescue the President of the United States, after which, if successful, he will be pardoned.',
        duration:'99 minutes',
        director:'John Carpenter',
        screenwriter:'John Carpenter',
        cast:'Kurt Russell, Lee Van Cleef, Ernest Borgnine, Donald Pleasence, Isaac Hayes, Harry Dean Stanton, Adrienne Barbeau'
    },
    {
        title:'Ghostbusters',
        year:'1984',
        plot:'three eccentric parapsychologists who start a ghost-catching business in New York City.',
        duration:'105 minutes',
        director:'Ivan Reitman',
        screenwriter:'Dan Aykroyd, Harold Ramis',
        cast:'Bill Murray, Dan Aykroyd, Sigourney Weaver, Harold Ramis, Rick Moranis'
    },
    {
        title:'Lethal Weapon',
        year:'1987',
        plot:'A pair of mismatched LAPD detectives, Martin Riggs, a former Green Beret who has become suicidal following the death of his wife and veteran officer and family man Roger Murtaugh work together as partners.',
        duration:'112 minutes',
        director:'Richard Donner',
        screenwriter:'Shane Black',
        cast:'Mel Gibson, Danny Glover, Gary Busey'
    },
    {
        title:'Die Hard',
        year:'1988',
        plot:'Die Hard follows New York City police detective John McClane, who is caught up in a terrorist takeover of a Los Angeles skyscraper while visiting his estranged wife.',
        duration:'132 minutes',
        director:'John McTiernan',
        screenwriter:'Jeb Stuart, Steven E. de Souza',
        cast:'Bruce Willis, Alan Rickman, Alexander Godunov, Bonnie Bedelia'
    },
    {
        title:'Stand by Me',
        year:'1986',
        plot:'the film is set in the fictional town of Castle Rock, Oregon in 1959 and tells a story about four friends who go on a hike to find the dead body of a missing boy.',
        duration:'89 minutes',
        director:'Rob Reiner',
        screenwriter:'Bruce A. Evans, Raynold Gideon',
        cast:'Wil Wheaton, River Phoenix, Corey Feldman, Jerry O\'Connell, Kiefer Sutherland'
    },
    {
        title:'The Thing',
        year:'1982',
        plot:'it tells the story of a group of American researchers in Antarctica who encounter the eponymous "Thing", an extraterrestrial life-form that assimilates, then imitates, other organisms. The group is overcome by paranoia and conflict as they learn that they can no longer trust each other and that any of them could be the Thing.',
        duration:'109 minutes',
        director:'John Carpenter',
        screenwriter:'Bill Lancaster',
        cast:'Kurt Russell, Wilford Brimley, T.K. Carter, David Clennon, Keith David, Richard Dysart, Charles Hallahan, Peter Maloney'
    },
    {
        title:'Back to the Future',
        year:'1985',
        plot:'a teenager accidentally sent back to 1955 in a time-traveling DeLorean automobile built by his eccentric scientist friend Emmett "Doc" Brown (Lloyd), where he inadvertently prevents his future parents from falling in love threatening his own existence.  He is forced to reconcile them and somehow get back to the future.',
        duration:'115 minutes',
        director:'Robert Zemeckis',
        screenwriter:'Robert Zemeckis, Bob Gale',
        cast:'Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover'
    },
    {
        title:'The Terminator',
        year:'1984',
        plot:'Disguised as a human, a cyborg assassin known as a Terminator (Arnold Schwarzenegger) travels from 2029 to 1984 to kill Sarah Connor (Linda Hamilton). Sent to protect Sarah is Kyle Reese (Michael Biehn), who divulges the coming of Skynet, an artificial intelligence system that will spark a nuclear holocaust.',
        duration:'107 minutes',
        director:'James Cameron',
        screenwriter:'James Cameron, Gale Anne Hurd',
        cast:'Arnold Schwarzenegger, Michael Biehn, Linda Hamilton, Paul Winfield'
    },
];

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// Sets up Logger
app.use(morgan('combined', {stream: accessLogStream}));

// This Serves the statics files in the "public" folder
app.use(express.static('public'));

// Get requests
app.get('/', (req, res) => {
    res.send('Welcome to the Breakfast Club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root:__dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Creating error-handling that log all errors to terminal
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Listens for requests
app.listen(8080, () => {
    console.log('80s Flixs app is listening on port 8080');
});

http.createServer((request, response) => {
    let requestURL = url.parse(request.url, true);
    if (requestURL.pathname == '/documentation.html'); {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Documentation on the 80s Flixs API.\n');
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Welcome to the 80s Flixs API!');
    }

    }).listen(8080);

    console.log('80s Flixs API is running on Port 8080.');