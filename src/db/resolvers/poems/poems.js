const {Op} = require("sequelize");
const {Poem,CategoryModel} = require('../../models')

const poems = {
    Query: {
        poems: async (parent, args = {order: 'ASC'}) => {
            const options = {}
            const {order, category, search} = args
            if (order) {
                options.order = [['authDate', order], ['id', order], ['idInCategory', order]]
            }
            if (category != null) {
                if (search != null) {
                    options.where = {
                        [Op.and]: [{category}],
                        content: {[Op.like]: `${search}`}
                    }
                } else {
                    options.where = {category}
                }
            } else {
                if (search != null) {
                    options.where = {
                        content: {[Op.like]: `${search}`}
                    }
                }
            }
            return await Poem.findAll(options)
        },
        getPoemById: async (parent, {id}) => await Poem.findByPk(id),
        getPoemByCategoryId: async (parent, {
            category,
            idInCategory
        }) => await Poem.findAll({where: {[Op.and]: {category, idInCategory}}}),
        getPoemByContent: async (parent, {content}) => await Poem.findAll({where: {content}}),
        maxIdPoems: async () => await Poem.max('id'),
        countPoems: async () => await Poem.count(),
    },
    Mutation: {
        addPoem: async (parent, args) => {
            try {
                return await Poem.create(args.input)
            } catch (e) {
                console.error(e.message)
            }
        },
        addMassPoem: async (parent, args) => {
            try {
                const r = await Poem.bulkCreate(args.input, {
                    ignoreDuplicates: true
                })
                return r.length
            } catch (e) {
                console.error(e)
            }
        }
    },
    Others: {
        Poem: {
            category: async ({category}) => {
                return await CategoryModel.findByPk(category)
            }
        }
    },
}

module.exports = poems