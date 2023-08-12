const { Poem, CategoryModel } = require('../../models')
// const {sequelize} = require("../");

const categories = {
    Query: {
        categories: async () => await CategoryModel.findAll({
            order: [['description']]
        }),
        maxIdInCategory: async (parent, { category }) => await Poem.max('idInCategory', {
            where: { category }
        }),
        minIdInCategory: async (parent, { category }) => await Poem.min('idInCategory', {
            where: { category }
        }),
        countCategories: async () => await CategoryModel.count(),
        minMaxByCategory: async () => {
            const [results, metadata] = await sequelize.query("SELECT max(idInCategory) as max, min(idInCategory) as min , category FROM Poems group by category")
            return results
        }
    },
    Mutation: {

    },
    Others: {

    },
}

module.exports = categories