const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  sequelize.define('reviewActivity', {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull: false
    },
  
  },{timestamps:true});
};
