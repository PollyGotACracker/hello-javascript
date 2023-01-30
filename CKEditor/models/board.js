import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return sequelize.define(
    "board",
    {
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      b_eng: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      b_kor: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      b_group_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      b_group_eng: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      b_group_kor: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "board",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "b_code" }],
        },
      ],
    }
  );
};
