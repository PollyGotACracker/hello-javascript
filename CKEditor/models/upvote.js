import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "upvote",
    {
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "upvote",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "b_code" }, { name: "username" }],
        },
      ],
    }
  );
};
