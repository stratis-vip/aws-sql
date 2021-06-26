const {ApolloError} = require("apollo-server");
const {companyMdl} = require("../../models");

const companies ={
    Query: {
        getCompanies: async () => {
            try{
                return await companyMdl.findAll()
            }catch (err){
                throw new ApolloError(err.message)
            }
        }
    },
    Mutation:{
    },
    Others:{}
}

module.exports = companies