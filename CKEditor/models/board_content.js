import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "board_content",
    {
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      b_title: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      b_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      b_category: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      b_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%Y-%m-%d'))"
        ),
      },
      b_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%H:%i:%S'))"
        ),
      },
      b_update: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      b_delete: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      b_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      b_upvote: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      b_group: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "board_content",
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
