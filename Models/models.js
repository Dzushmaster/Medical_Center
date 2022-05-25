const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const Doctor = sequelize.define("doctors", {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    fullname:{type: DataTypes.STRING(50) ,allowNull: false},
    speciality:{type: DataTypes.STRING(50) ,allowNull: false},
    email:{type: DataTypes.STRING(100) ,allowNull: false},
    login:{type: DataTypes.STRING(30) ,allowNull: false},
    password:{type: DataTypes.STRING(30) ,allowNull: false},
    experience:{type: DataTypes.TINYINT,allowNull: false}
})
const HAnalyse = sequelize.define('home_analyses', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    pulse:{type: DataTypes.SMALLINT,allowNull: true},
    temperature:{type: DataTypes.FLOAT,allowNull: true},
    blood_press:{type: DataTypes.STRING(8),allowNull: true},
    date:{type: DataTypes.DATEONLY, allowNull:false}
})
const User = sequelize.define('users', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    fullname:{type: DataTypes.STRING(50),allowNull: false},
    gender:{type: DataTypes.CHAR(1),allowNull: false},
    birthdate:{type: DataTypes.DATEONLY, allowNull: false},
    telenumber:{type: DataTypes.STRING(15),allowNull: true},
    email:{type: DataTypes.STRING(100), unique: true,allowNull: false},
    login:{type: DataTypes.STRING(30), unique: true, allowNull: false},
    password:{type: DataTypes.STRING(100),allowNull: false}
})
const Visit = sequelize.define('visities', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    date:{type: DataTypes.DATEONLY ,allowNull: false, timestamps: false},
    begin:{type: DataTypes.TIME, allowNull: false},
    end:{type: DataTypes.TIME, allowNull: false}
})
const Workday = sequelize.define('workdays', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    cabinet:{type: DataTypes.SMALLINT ,allowNull: false},
    day:{type: DataTypes.DATEONLY ,allowNull: false},
    begin:{type: DataTypes.TIME ,allowNull: false},
    end:{type: DataTypes.TIME ,allowNull: false},
    busy:{type: DataTypes.BOOLEAN, allowNull: false, default: false}
})
User.hasMany(Visit)
Visit.belongsTo(User)

User.hasMany(HAnalyse)
HAnalyse.belongsTo(User)

Doctor.hasMany(Visit)
Visit.belongsTo(Doctor)

Doctor.hasMany(Workday)
Workday.belongsTo(Doctor)

module.exports = {Doctor, HAnalyse, User, Visit, Workday}
