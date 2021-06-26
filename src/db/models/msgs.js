const {DateTime} = require("luxon");
const {DataTypes} = require("sequelize");
const {sequelize} = require('../')

const companyMdl = sequelize.define('company', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    expenses: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: -4.0
    }
}, {
    charset: 'utf8',
    modelName: 'companies'
})

const dayStatMdl = sequelize.define('dayStat', {
    date: {
        type: DataTypes.DATEONLY,
        primaryKey: true,
    },
    msgs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ans: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    hourlyStats: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "[]"
    }
}, {
    charset: 'utf8',
})

const sessionMdl = sequelize.define('session', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    start_msgs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stop: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    stop_msgs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },

}, {charset: 'utf8'})

const userMdl = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
})

const paymentMdl = sequelize.define('payment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    expenses: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: -4
    },
    notes: {
        type: DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    }
})


companyMdl.hasMany(paymentMdl, {
    foreignKey: {
        allowNull: false
    }
})

companyMdl.hasMany(dayStatMdl, {
    foreignKey: {
        allowNull: false
    }
})

dayStatMdl.belongsTo(companyMdl, {
    foreignKey: {
        allowNull: false
    }
})

companyMdl.hasMany(sessionMdl, {
    foreignKey: {
        allowNull: false
    }
})

sessionMdl.belongsTo(companyMdl,
    {
        foreignKey: {
            allowNull: false
        }
    })

sessionMdl.belongsTo(userMdl,
    {
        foreignKey: {
            allowNull: false
        }
    })

module.exports = {companyMdl, dayStatMdl, sessionMdl, userMdl, paymentMdl}
