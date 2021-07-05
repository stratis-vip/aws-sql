const {sequelize} = require("../../index");
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const {companyMdl} = require("../../models");
const {userMdl} = require("../../models");
const {ApolloError} = require("apollo-server");
const {sessionMdl} = require("../../models");
const {DateTime} = require("luxon");

const sessions = {
    Query: {
        getSessions: async (_, args) => {
            try {
                let where = ''
                const {userId, from, to, day} = args
                if (userId) {
                    where = `userId = "${userId}" and `
                }
                console.log(where)
                if (day) {
                   const [a,metadata] = await sequelize.query(`select * from sessions where  ${where} date(start) = "${day}" ORDER BY start`)
                    return a
                } else {
                    let newWhere = where
                    if (from) {
                        newWhere = `date(start) >= "${from}" `
                        // where.start = {[Op.gte]: from}
                    }
                    if (to) {
                        newWhere += ` AND (date(start) <= "${to}")`
                        // where.stop = {[Op.or]: [{[Op.lte]: to}, {[Op.eq]: null}]}
                    }
                    const [a,metadata] = await sequelize.query(`select * from sessions where ${where} ${newWhere} ORDER BY start`)

                    return a
                }

                // return await sessionMdl.findAll({where, order: ['start']})
            } catch (err) {
                throw new ApolloError(err.message)
            }

        },
        getCurrentOpenSession: async (_, args) => {
            console.log(args)
            const retVal = await sessionMdl.findAll({
                where: {
                    [Op.and]: {
                        stop: null,
                        start: {[Op.gte]: args.day}
                    }
                }
            })
            if (retVal.length === 0) {
                return null
            }
            return retVal[0]
        },
    },
    Mutation: {
        setSession: async (_, args) => {
            // userId: 'ddabe620-c2de-11ea-9a96-5b4fe559bddc',
            //   companyId: 'a35a0a95-302d-11eb-acff-0242ac110002',
            //   start: 2020-12-05T10:12:13.000Z,
            //   start_msgs: 345
            const {id, userId} = args
            try {
                if (id) {
                    //Update
                    console.log('I will update! ', args)
                    try {
                        await sessionMdl.update(args, {where: {id}})
                        return await sessionMdl.findByPk(id)
                    } catch (err) {
                        throw new ApolloError(err.message)
                    }
                } else {
                    //Create
                    try {
                        return await sessionMdl.create(args)
                    } catch (err) {
                        throw new ApolloError(err.message)
                    }
                }

            } catch (err) {
                throw new ApolloError(err.message)
            }

            console.log(args)
        },
        closeSession : async (_, args) => {
            const {id} = args
            await sessionMdl.update(args, {where: {id}})
            return await sessionMdl.findByPk(id)
        }
    },
    Others: {
        Session: {
            user: async ({userId}) => {
                try {
                    return await userMdl.findByPk(userId)
                } catch (err) {
                    throw new ApolloError(err.message)
                }
            },
            company: async ({companyId}) => {
                try {
                    return await companyMdl.findByPk(companyId)
                } catch (err) {
                    throw new ApolloError(err.message)
                }
            },
        }

    }
}

module.exports = sessions