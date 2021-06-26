// const {checkStatus} = require('../index')
const keimena = require('./poems')
const scalars = require('./scalars')
const msgs = require('./msgs')


const resolvers = {
    Query: {
        ...keimena.Query,
        ...msgs.Query,
        // status: async () => await checkStatus(),
    },
    Mutation: {
        ...keimena.Mutation,
        ...msgs.Mutation
    },
    ...keimena.Others,
    ...msgs.Others,

    ...scalars
};

module.exports = resolvers