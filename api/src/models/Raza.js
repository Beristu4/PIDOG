const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    alturaMax:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alturaMin:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pesoMax:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pesoMin:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
