import _attach from "./attach.js";
import _board_content from "./board_content.js";
import _reply from "./reply.js";
import _upvote from "./upvote.js";

const initModels = (sequelize) => {
  const attach = _attach(sequelize);
  const board_content = _board_content(sequelize);
  const reply = _reply(sequelize);
  const upvote = _upvote(sequelize);

  board_content.hasMany(attach, { as: "attachs", foreignKey: "b_code" });
  attach.belongsTo(board_content, {
    as: "post",
    foreignKey: "b_code",
  });

  return {
    attach,
    board_content,
    reply,
    upvote,
  };
};
export default initModels;
