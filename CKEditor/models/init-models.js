import _attach from "./attach.js";
import _board from "./board.js";
import _post from "./post.js";
import _reply from "./reply.js";
import _upvote from "./upvote.js";

const initModels = (sequelize) => {
  const attach = _attach(sequelize);
  const board = _board(sequelize);
  const post = _post(sequelize);
  const reply = _reply(sequelize);
  const upvote = _upvote(sequelize);

  // board_content.hasMany(attach, { as: "attachs", foreignKey: "p_code" });
  // attach.belongsTo(board_content, {
  //   as: "post",
  //   foreignKey: "p_code",
  // });

  return {
    attach,
    board,
    post,
    reply,
    upvote,
  };
};
export default initModels;
