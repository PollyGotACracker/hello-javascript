import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return sequelize.define(
    "post",
    {
      p_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      p_title: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      p_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      b_code: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      p_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%Y-%m-%d'))"
        ),
      },
      p_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal(
          "(date_format(now(),_utf8mb4'%H:%i:%S'))"
        ),
      },
      p_updated: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      p_deleted: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      p_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      p_replies: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      p_upvote: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      b_group_code: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "post",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "p_code" }],
        },
      ],
    }
  );
};
