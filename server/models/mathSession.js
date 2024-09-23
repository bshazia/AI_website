// models/mathSession.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust path to your database configuration

class MathSession extends Model {}

MathSession.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MathSession",
    tableName: "ai_math_sessions",
    timestamps: true,
  }
);

module.exports = MathSession;
