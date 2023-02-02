import BoardList from "./BoardList";
import "../css/Board.css";
import { useState, useLayoutEffect } from "react";
import { getBoardPosts } from "../service/post.service";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const bEng = params.board;
  const { data, board } = await getBoardPosts(bEng);
  return { data, board };
};

const Board = () => {
  const { data, board } = useLoaderData();

  return (
    <main className="commu-cat">
      <h1>{board.b_kor}</h1>
      <section>
        <button>{"최신순"}</button>
        <div>
          <button className="latest">최신순</button>
          <button className="upvote">추천순</button>
          <button className="reply">댓글순</button>
          <button className="views">조회순</button>
        </div>
        <div>
          <input />
          <button>검색</button>
        </div>
        {/* 관리자 권한 추가 */}
        {board.b_eng !== "notice" && (
          <Link
            to={`/community/write`}
            state={{
              b_code: board.b_code,
              b_group_code: board.b_group_code,
            }}
          >
            글쓰기
          </Link>
        )}
      </section>

      <BoardList data={data} />
    </main>
  );
};

export default Board;
