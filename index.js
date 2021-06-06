const app = require('./src/server')
const {ApolloServer, gql} = require('apollo-server');


const {checkStatus} = require('./src/db/index.js')

const mariadb = require('mariadb');

// mariadb.createConnection({host: 'db22.papaki.gr', user: 'dbaseuser', password: 'Jqw6f0^9'})
//     .then(conn => {
//         conn.query("select 1", [2])
//             .then(rows => {
//                 console.log(rows); // [{ "1": 1 }]
//                 conn.end();
//             })
//             .catch(err => {
//                 //handle query error
//             });
//     })
//     .catch(err => {
//         //handle connection error
//     });

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});



    checkStatus()
// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

// const HTTP_PORT = process.env.PORT || 8000
//
// app.listen(HTTP_PORT, () => console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT)))
