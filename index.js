
const app = require('./src/server')
const typeDefs = require('./src/db/schema')
const resolvers = require('./src/db/resolvers')
const {ApolloServer} = require('apollo-server');
const cors = require('cors')



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// const schema = makeExecutableSchema({typeDefs,resolvers})
const server = new ApolloServer({ typeDefs, resolvers});


// const status = await checkStatus()
// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

// const HTTP_PORT = process.env.PORT || 8000
//
// app.listen(HTTP_PORT, () => console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT)))
