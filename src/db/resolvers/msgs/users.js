const crypt = require("bcryptjs");
const {UserInputError} = require("apollo-server");
const {ApolloError} = require("apollo-server");
const {userMdl} = require("../../models");

const users = {
    Query: {
        getUser: async (_parent, {id}) => {
            try {
                return await userMdl.findByPk(id)
            } catch (err) {
                throw new ApolloError(err.message)
            }
        },
        getUsers: async () => {
            try {
                return await userMdl.findAll()
            } catch (err) {
                throw  new ApolloError(err.message)
            }
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            try {
                const {email} = args
                const userExists = await userMdl.findOne({where: {email}})
                if (userExists) throw new ApolloError(`Email ${email} exists`)
                args.password = await crypt.hash(args.password, 12)
                const user = await userMdl.create({...args})
                if (user) {
                    return user
                }
                throw new ApolloError('Cant Create user')
            } catch (error) {
                throw new UserInputError(error.message, error)
            }
        },
        updateUser: async (_, args) => {
            try {
                const {id} = args
                const userExists = await userMdl.findByPk(id)
                if (!userExists) throw new ApolloError(`User doesn't exists`)
                await userMdl.update(args, {where: {id}})
                const retVal = await userMdl.findByPk(id)
                if (retVal)
                    return retVal
                throw new ApolloError('Cant Create user')
            } catch (error) {
                throw new UserInputError(error.message, error)
            }
        }
    },
}

module.exports = users