import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "reply",
    {
      r_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      r_content: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      r_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%Y-%m-%d'))"
        ),
      },
      r_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%H:%i:%S'))"
        ),
      },
      r_update: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      r_delete: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      r_parent_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reply",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "r_code" }],
        },
      ],
    }
  );
};
