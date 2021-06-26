const days = require('./days')
const sessions = require('./sessions')
const companies = require('./companies')
const users = require('./users')
const statistics = require('./statistics')
const payments = require('./payments')

const msgs = {
    Query: {
        ...days.Query,
        ...sessions.Query,
        ...companies.Query,
        ...users.Query,
        ...statistics.Query,
        ...payments.Query
    },
    Mutation: {
        ...days.Mutation,
        ...sessions.Mutation,
        ...companies.Mutation,
        ...users.Mutation,
        ...payments.Mutation
    },
    Others: {
        ...days.Others,
        ...sessions.Others,
        ...companies.Others,
        ...users.Others,
        ...statistics.Others,
        ...payments.Others
    }

}
module.exports = msgs