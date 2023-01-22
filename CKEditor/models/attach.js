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
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%Y-%m-%d'))"
        ),
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
