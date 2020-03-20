# Tic Tac Toe - Thirty Madison Challenge

## Overview

Hello! Welcome to my implementation of TicTacToe using React. It's a game we all know and love, which
makes it an interesting coding challenge. The basic functional requirements are well defined, so how
do we go above and beyond your basic `create-react-app` and make this a kick ass submission?! 

Hopefully you find the answers to the question above in the repo. 

## Requirements
- Node >v11.0.0 (to run tests using Jest)
- Npm >v6.0.0

## Get Started
To run the application locally, run the following commands from the root directory
of the repository.

- 'npm install'
- 'npm run start'

To run the application in a development environment:

- 'npm install'
- 'npm run react-dev'
- 'npm run server-dev'

To build the application for a production environment:

- 'npm install'
- 'npm run build'
- 'npm run prod'

You can now navigate to https://localhost:8000/ on your browser to test and enjoy!

## Features

### Local Two-Player (Core Gameplay)
As one would expect, a two-player game isn't nearly as fun without... well, the second player!
In this version of React TicTacToe you can start (and hopefully win) a local game with another 
player in a single browser window.

Future work would involve creating a second 'play' mode where a hosted instance of the application
could enable multiple players on multiple clients to play together. The application was architected
with this future product roadmap in mind. 

### Production Build Quality
React is a fantastic framework, but comes with a specific and difficult to mitigate cost. It's huge! 
Or it can be anyways without the appropriate configuration.

In this project, I used the latest version of webpack along with:
- Component Code Splitting and React Router
- Minification
- Uglification

To reduce the total application build from:

0.bundle.js     789 KiB      0      [emitted]  
1.bundle.js     47.3 KiB     1      [emitted]  
app.bundle.js   2.81 MiB     app    [emitted]

Total: 3713.44 KiB

To a much more manageable:

1.bundle.js     61 KiB       1      [emitted]  
2.bundle.js     10.6 KiB     2      [emitted]  
app.bundle.js   152 KiB      0      [emitted]

Total: 223.6 KiB

Representing only 6% of the uncompressed size. While this would still be relatively large 
for a production distribution of a light-weight TicTacToe client, it's a dramatic improvement.

Future work in this area would involve futher compression of distributables, optimizing assets,
CSS compression and whatever else we can do to make this teeny, teeny tiny.

### Testing

Testing in this project is facillitated through Jest - which is a well-known and easy to setup 
testing framework. 

Given that this project was time-constrained, I chose to test only mission critical elements of
the application. This included:
- The FetchXO mock API
- TicTacToe core solution functions (checkWinGame, takeTurn, etc.)

Future work in this area would involve increasing test coverage to an acceptable level (ideally >80%)
for industry best practice. 

## Retrospective

This was a really interesting coding challenge. I think the spectrum of quality for a simple
application (like TicTacToe) is extremely broad. This opens up an opportunity for a developer
to go above and beyond in delivering eloquent implementations of core functionality OR
for them to implement future facing functionality. In this submission I hope to have provided a little of both.

At the outset of the project I was really hoping to put together a simple AI to enable a 1-player 
mode (AI being used in the broadest of terms here). After configuring Jest for webpack which, as 
expected, was frustratingly arcane - I found myself with little time left to start an entirely new 
feature / epic. In future projects I hope to avoid this issue by configuring my testing frameworks
straight away.

Additionally, although TicTacToe is a simple game, given more time I would have implemented a more sophisticated style guide and CSS into the application.