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

  // post.hasMany(attach, { as: "attachs", foreignKey: "p_code" });
  // attach.belongsTo(post, {
  //   as: "post",
  //   foreignKey: "p_code",
  // });

  // board data import
  board.hasMany(post, { foreignKey: "b_code" });
  post.belongsTo(board, { foreignKey: "b_code" });

  post.hasMany(reply, { foreignKey: "p_code" });
  reply.belongsTo(post, { foreignKey: "p_code" });

  return {
    attach,
    board,
    post,
    reply,
    upvote,
  };
};
export default initModels;
