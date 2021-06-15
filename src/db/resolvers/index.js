const {checkStatus} = require('../index')
const poems = require('./poems/poems')
const categories = require('./poems/categories')
const users = require('./msgs/users')
const companies = require('./msgs/companies')
const sessions = require('./msgs/sessions')
const days = require('./msgs/days')
const scalars = require('./scalars')


const resolvers = {
    Query: {
        ...poems.Query,
        ...categories.Query,
        ...users.Query,
        ...companies.Query,
        ...sessions.Query,
        ...days.Query,

        status: async () => await checkStatus(),
    },
    ...poems.Others,
    ...sessions.Others,
    ...days.Others,
    Mutation: {
        ...poems.Mutation,
        ...users.Mutation,
        ...companies.Mutation,
        ...sessions.Mutation,
        ...days.Mutation
    },
    ...scalars
};

module.exports = resolvers