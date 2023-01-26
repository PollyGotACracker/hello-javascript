import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "attach",
    {
      a_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      a_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      a_original_name: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      a_save_name: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      a_ext: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "attach",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "a_code" }],
        },
      ],
    }
  );
};
