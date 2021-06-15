const {ApolloError} = require("apollo-server");
const {DateTime} = require("luxon");
const {GraphQLScalarType} = require("graphql");


const scalars = {
    Stats: new GraphQLScalarType({
        name: 'Stats',
        description: 'Τύπος στατιστικών που κρατά τα στατιστικά μηνυμάτων\n   σε μορφή πίνακα ακεραίων ανά ώρα [0,0,0...0]. Ενα μέλος ανα ώρα',
        parseValue: (value) => {
            const local = Array.isArray(value) ? value : []
            return JSON.stringify(local.length > 0 ? local : [...Array(24)].map(_ => 0))
        },
        serialize: value => {
            return JSON.parse(value)
        }
    }),
    DateOnly: new GraphQLScalarType({
        name: 'DateOnly',
        description: 'Τύπος ημερομηνίας που κρατά την ημερομηνία σε μορφή YYYY-MM-DD',
        parseValue: (value) => {
            return value
        },
        parseLiteral: (value) => value,
        serialize: (value => {
            if (DateTime.fromFormat(value, "yyyy-dd-mm").isValid)
                return value
            else {
                console.log(value)
                throw new ApolloError('Date is wrong')
            }
        })
    }),
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Τύπος ημερομηνίας που κρατά την ημερομηνία σε μορφή YYYY-MM-DD HH:MM:SS',
        parseValue: value => new Date(value),
        parseLiteral: value => value,
        serialize: value => new Date(value)
    }),
}

module.exports = scalars