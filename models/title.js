'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Title extends Model {}
  Title.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      date: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      discount: DataTypes.STRING,
    }, 
    {
      sequelize,
      modelName: 'Title',
    },
  );
  return Title;
};