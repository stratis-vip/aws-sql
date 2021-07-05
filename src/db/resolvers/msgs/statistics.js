const {Op} = require("sequelize");
const {sessionMdl, dayStatMdl, userMdl, companyMdl} = require('../../models')
const {DateTime} = require('luxon')
const {sequelize} = require('../../../db')

const statistics = {
    Query: {
        generalStatistics: async (parent, {userId}) => {
            //πόσα μηνύματα είναι πριν τα sessions
            try {
                //1o na brv την ημερομηνία που άρχισαν τα sessions
                const dayBeforeSessions = await sessionMdl.min('start')
                const date = DateTime.fromJSDate(dayBeforeSessions).toISODate()
                const msgsBeforeSessions = await dayStatMdl.sum('msgs', {
                    where: {
                        date: {[Op.lt]: date}
                    }
                })
                //πόσοι είναι οι users
                const userCount = (await sessionMdl.findAll({attributes: ['userId'], group: ['userId']})).length
                const sliceMessage = msgsBeforeSessions / userCount
                const kratoumeno = msgsBeforeSessions - (sliceMessage * userCount)
                console.log((kratoumeno))
                const [results, metadata] = await sequelize.query(`select sum(stop_msgs - start_msgs) as msgs, companyId,  sum(TIMESTAMPDIFF(SECOND, start, stop)) as secs , userId from sessions group by userId`)

                const retVal = results.map(r => {
                    return {...r, msgs: r.msgs + sliceMessage}
                })
                if (kratoumeno) retVal[retVal.length - 1].msgs = retVal[retVal.length - 1].msgs + kratoumeno
                if (userId) {
                    return results.filter(stat => stat.userId === userId)
                } else {
                    return results
                }
            } catch (e) {
                console.log(e)
            }
        },
        msgStatistics: async (_, {companyId}) => {
            try{
                return await sequelize.query(`call GetMsgsStatistics('${companyId}')`)
            }catch (e){
                console.log(e)
            }

        }
    },
    Others: {
        Statistic: {
            user: async ({userId}) => {
                console.log(userId)
                return await userMdl.findByPk(userId)
            },
            company: async ({companyId}) => {
                console.log(companyId)
                return await companyMdl.findByPk(companyId)
            }
        }
    }
}

module.exports = statistics