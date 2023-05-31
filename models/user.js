const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User Model 
class User extends Model {
        //set up method to run on instance data to check pw
        checkPassword(loginPw) {
            return bycrypt.compareSync(loginPw, this.password);
        }
}

// define table colums and configuration 
User.init(
    {
        //define id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true
        },
        github: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //emaile column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: truevalidate: {
                isEmail: true
            }
        },
        // password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[4]
            }
        }
    },
{
    hooks: {
        // seatup beforeCreate lifecycle "hook" fuctionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcypt.hash(newUserData.pasword, 10);
            return newUserData;
        },
        // set up beforeUpdate lifecyle "hook" functionality
        async beforeUpdate(updateUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;
