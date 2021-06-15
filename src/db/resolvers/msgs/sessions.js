const {companyMdl} = require("../../models");
const {userMdl} = require("../../models");
const {ApolloError} = require("apollo-server");
const {sessionMdl} = require("../../models");
const {DateTime} = require("luxon");

const sessions = {
    Query: {
        getSessions: async (_, args) => {
            try{
                const where = {}
                const {userId, from, to } = args
                const newTo = to ? DateTime.fromJSDate(to).endOf('day').toISO() : null
                if (userId){
                    where.userId = userId
                }

                if (from){
                    where.start = {[Op.gte]: from}
                }
                if (newTo){
                    where.stop = {[Op.or]:[{[Op.lte]: newTo},{[Op.eq]:null}]}
                }
                return await sessionMdl.findAll({where,order: ['start']})
            }catch (err){
                throw new ApolloError(err.message)
            }

        }
    },
    Mutation: {
        setSession: async (_, args) => {
            // userId: 'ddabe620-c2de-11ea-9a96-5b4fe559bddc',
            //   companyId: 'a35a0a95-302d-11eb-acff-0242ac110002',
            //   start: 2020-12-05T10:12:13.000Z,
            //   start_msgs: 345
            const {id, userId} = args
            try{
                if (id){
                    //Update
                    console.log(args)
                    try {
                        await sessionMdl.update(args, {where: {id}})
                        return await sessionMdl.findByPk(id)
                    }catch (err){
                        throw new ApolloError(err.message)
                    }
                }else {
                    //Create
                    try {
                        return await sessionMdl.create(args)
                    }catch (err){
                        throw new ApolloError(err.message)
                    }
                }

            }catch(err){
                throw new ApolloError(err.message)
            }

            console.log(args)
        }
        ,
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