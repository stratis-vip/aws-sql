const {companyMdl} = require("../../models");
const {Op} = require("sequelize");
const {ApolloError} = require("apollo-server");
const {dayStatMdl} = require("../../models");

const days = {
    Query: {
        timeUpdated: async ()=> {
            try{
                return await dayStatMdl.findOne({ order:[['date','DESC']]})

            }catch (err){
                throw new ApolloError(err.message)
            }
        },
        getDays: async (_, {from}) => {
            try {
                // const date = Object.keys(args).length === 0 ? null :
                const where = from ? {where: {date: {[Op.gte]:from}}}: undefined
                console.log('FROM = ', from )
                const dayStats = await dayStatMdl.findAll({
                    order: ['date'], ...where
                })
                return dayStats
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        getDay: async (_, {date}) => {
            try {
                return await dayStatMdl.findOne({
                    where: {date}
                })
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        getDaysByCompany: async (_, {companyId, offset, limit, from}) => {
            try {
                const off = {}
                if (limit !== undefined && limit > 0) {
                    off.limit = limit
                    if (offset) {
                        off.offset = offset
                    }
                }
                const fr = from ? {date: {[Op.gte]: from}} : undefined


                return await dayStatMdl.findAll({
                    ...off, order: [['date', 'DESC']], where: {
                        ...fr,
                        companyId
                    }
                })
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        daysCount: async () => {
            try {
                let retVal = 0
                const count = await dayStatMdl.count()
                if (count) retVal = count
                return retVal
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
    },

    Mutation: {
        setDay: async (_, args) => {
            try {
                const exists = await dayStatMdl.findByPk(args.date)
                let al
                if (exists) {
                    await dayStatMdl.update({...args}, {where: {date: args.date}})
                    al = await dayStatMdl.findByPk(args.date)
                } else {
                    al = await dayStatMdl.create({...args})
                }
                // args.updatedAt = al?.getDataValue('updatedAt')
                // pubSub.publish(DAY_ADDED, {timeUpdatedS: args})
                return al
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        updateDayArray: async (_, args) => {
            try {
                const retVal = []
                console.log(args)
                const {companyId} = args
                for (const ds of args.dates) {
                    const {date, msgs, ans, hourlyStats} = ds
                    const rec = await dayStatMdl.findOne({
                        where: {
                            date, companyId
                        }
                    })
                    if (rec) {
                        console.log('UPDATE RETURN ',await rec.update({msgs, ans, hourlyStats}))
                        retVal.push(await dayStatMdl.findOne({
                            where: {
                                date, companyId
                            }
                        }))
                    } else throw new ApolloError(`Not exists such a record ${date}`)
                }
                return retVal
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },

    },
    Others: {
        DayStat: {
            company: async (parent) => {
                try {
                    const {companyId} = parent
                    return await companyMdl.findByPk(String(companyId))
                } catch (err) {
                    return new ApolloError(err.message)
                }
            }
        }
    },
    // Subscription: {
    //     timeUpdatedS: {
    //         subscribe: () => pubSub.asyncIterator([DAY_ADDED])
    //
    //         // async () => {
    //         // try {
    //         //   const last = await dayStatMdl.findOne({order: [['DESC', 'date']]})
    //         //   console.log(last)
    //         //   if (last) {
    //         //   return last.getDataValue('updatedAt')}else return null
    //         // }catch (err){
    //         //   throw new ApolloError(err.message)
    //         // }
    //     }
    // }
}

module.exports = days