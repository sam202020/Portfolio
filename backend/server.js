// importing dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    roll(numRolls: Int!): [Int]
  }
  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    getDie(numSides: Int): RandomDie
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
      return 'Hello world!';
    },
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
      return Math.random();
    },
    rollDice: function ({numDice, numSides}) {
      var output = [];
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    }
  };

// setting up the server
const port = 3001 || 3002; 
const server = express();

// setting up middleware
server.use(express.json());
server.use(cors());

// test route
server.get('/', (req, res) => res.send(`The server is up and running!`));

server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

server.listen(port, () => console.log(`The server is listening on port ${port}`));

module.exports = server;