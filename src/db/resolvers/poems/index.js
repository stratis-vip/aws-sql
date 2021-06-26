const categories = require('./categories')
const poems = require('./poems')


const keimena = {
    Query: {
        ...categories.Query,
        ...poems.Query,
    },
    Mutation: {
        ...categories.Mutation,
        ...poems.Mutation,
    },
    Others: {
        ...categories.Others,
        ...poems.Others,
    }

}
module.exports = keimena