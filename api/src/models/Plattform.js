const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "plattform",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      terminal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
