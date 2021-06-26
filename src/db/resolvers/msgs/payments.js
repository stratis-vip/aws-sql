const {Sequelize} = require("sequelize");
const {Op, fn} = require("sequelize");
const {sessionMdl, dayStatMdl, userMdl, companyMdl, paymentMdl} = require('../../models')
const {DateTime} = require('luxon')
// const {sequelize} = require('../../../db')

const payments = {
    Query: {
        getPayments: async () => await paymentMdl.findAll({order: ['date']}),
        getTotalPayments: async () => await paymentMdl.findAll({
            attributes: [
                ['companyId','companyId'],
                [Sequelize.fn('sum', Sequelize.col('amount')), 'amount'],
                [Sequelize.fn('sum', Sequelize.col('expenses')), 'expenses'],
            ],
            group: [['companyId']]
        })


        // statistics: async (parent, {userId}) => {
        //     //πόσα μηνύματα είναι πριν τα sessions
        //     try {
        //         //1o na brv την ημερομηνία που άρχισαν τα sessions
        //         const dayBeforeSessions = await sessionMdl.min('start')
        //         const date = DateTime.fromJSDate(dayBeforeSessions).toISODate()
        //         const msgsBeforeSessions = await dayStatMdl.sum('msgs', {
        //             where: {
        //                 date: {[Op.lt]: date}
        //             }
        //         })
        //         //πόσοι είναι οι users
        //         const userCount = (await sessionMdl.findAll({attributes: ['userId'], group: ['userId']})).length
        //         const sliceMessage = msgsBeforeSessions / userCount
        //         const kratoumeno = msgsBeforeSessions - (sliceMessage * userCount)
        //         console.log((kratoumeno))
        //         const [results, metadata] = await sequelize.query(`select sum(stop_msgs - start_msgs) as msgs, companyId,  sum(TIMESTAMPDIFF(SECOND, start, stop)) as secs , userId from sessions group by userId`)
        //
        //         const retVal = results.map(r => {
        //             return {...r, msgs: r.msgs + sliceMessage}
        //         })
        //         if (kratoumeno) retVal[retVal.length - 1].msgs = retVal[retVal.length - 1].msgs + kratoumeno
        //         if (userId) {
        //             return results.filter(stat => stat.userId === userId)
        //         } else {
        //             return results
        //         }
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
    },
    Mutation: {
        addPayment: async (parent, args) => {

            // const newArgs = {...args.input, date: args.input.date.value}
            console.log('Args', args, )
            try {
                const retVal = await paymentMdl.create(args.input)
                return retVal
            } catch (e) {
                console.log(e)
            }

        }
    },
    Others: {
        Payment: {
            company: async ({companyId}) => await companyMdl.findByPk(companyId),
        },
        TotalPayment:{
            company: async ({companyId}) => await companyMdl.findByPk(companyId),
        }
    }
}

module.exports = payments