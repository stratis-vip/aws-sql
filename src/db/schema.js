const {gql} = require('apollo-server');

const typeDefs = gql`
    scalar Date
    scalar DateOnly

    type Poem {
        id: Int!,
        idInCategory: Int!,
        content: String!,
        category: Category!,
        authDate: DateOnly!,
        explanation: String,
        createdAt: Date,
        updatedAt: Date
    }

    type Category{
        id: ID!,
        description: String!
    }

    input PoemsInput {
        id: Int!
        idInCategory: Int!,
        content: String!,
        category: ID!,
        authDate: DateOnly!,
        explanation: String,
    }


    #msgs
    scalar Stats

    type Session{
        id:ID!
        user:User!
        start:Date!
        start_msgs:Int!
        stop:Date
        stop_msgs: Int
        company: Company!
    }

    type User{
        id:ID!
        name:String!
        email:String!
        password:String!
        imgUrl:String
    }

    type DayStat{
        date:DateOnly!
        msgs:Int!
        ans:Int
        company:Company!
        hourlyStats:Stats
        updatedAt: Date!
    }

    type Company{
        id:ID!
        name:String!
        expenses: Float!
    }

    type Payment {
        id:ID!
        date:DateOnly!
        amount: Float!
        expenses: Float
        company: Company!
        notes: String
    }

    type TotalPayment {
        amount: Float!
        expenses: Float
        company: Company!
    }

    input inPayment {
        date:DateOnly!
        amount: Float!
        expenses: Float
        companyId: ID!
        notes: String
    }

    input InDayStat {
        date:DateOnly!
        msgs:Int!
        ans:Int
        hourlyStats: Stats
    }

    type Mutation {
        addPoem(input:PoemsInput!): Poem!
        addMassPoem(input: [PoemsInput!]!): Int!

        #msgs
        updateUser(id:ID!, name:String, email:String, imgUrl: String):User
        createUser( name:String!, email:String!, password: String!, imgUrl: String):User
        setSession(id:ID, userId:ID, companyId:ID,
            start:Date, start_msgs:Int,
            stop:Date, stop_msgs:Int,
        ):Session
        closeSession(id:ID!, stop:Date!, stop_msgs:Int!):Session!
        setDay(
            date:DateOnly!,
            msgs:Int!,
            ans: Int
            companyId:ID!
            hourlyStats:Stats!
        ): DayStat!
        updateDayArray(companyId:ID!, dates:[InDayStat]!):[DayStat!]!
        addPayment(input:inPayment):Payment!

    }

    type MinMax {
        category: ID!
        min: Int!
        max:Int!
    }

    type Statistic {
        msgs: Int!
        company: Company!
        user: User!
        secs: Int
    }
    
    type MsgStatistic {
        date: Int!
        msgs: Int!
        ans: Int!
        ps: Float!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        status: Boolean,
        poems (
            order:String,
            category: ID,
            search: String
        ): [Poem]!,
        getPoemById(id:Int!): Poem
        getPoemByContent(content:String!): [Poem]
        getPoemByCategoryId(category:ID!, idInCategory: Int!): [Poem]
        categories: [Category]!
        countPoems : Int!
        countCategories: Int!
        maxIdPoems : Int!
        minIdInCategory(category: ID!): Int!
        maxIdInCategory(category: ID!): Int!
        minMaxByCategory: [MinMax]!


        #msgs
        getUsers:[User]!
        getUserById(id:ID!):User
        getUserByEmail(email:String!):User
        getCompanies: [Company]!
        getSessions(userId:ID, from:DateOnly, to:DateOnly, day:DateOnly): [Session]!
        getCurrentOpenSession(day:DateOnly!):Session
        timeUpdated: DayStat!
        getDays(from:DateOnly): [DayStat]!
        getDay(date:DateOnly!): DayStat
        "Υπολογίζεί όλες τις εγγραφές που υπάρχου σε DayStats"
        daysCount: Int!
        msgsFromTo(from:DateOnly!, to:DateOnly!, companyId:ID!): Int!
        getDaysByCompany(companyId:ID!, offset:Int, limit:Int, from:DateOnly):[DayStat]!
        generalStatistics(userId:ID): [Statistic]!
        msgStatistics(companyId:ID!):[MsgStatistic]!
        getPayments:[Payment]!
        getTotalPayments: [TotalPayment]!
        
    }
`;

module.exports = typeDefs