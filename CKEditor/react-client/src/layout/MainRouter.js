import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CommMain from "../comps/CommMain";
import Board, { loader as BoardLoader } from "../comps/Board";
import PostDetail, { loader as DetailLoader } from "../comps/PostDetail";
import PostWrite from "../comps/PostWrite";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <CommMain /> },
      { path: "/community", element: <CommMain /> },
      {
        path: "/community/:board",
        loader: BoardLoader,
        element: <Board />,
      },
      {
        path: "/community/:board/:post",
        loader: DetailLoader,
        element: <PostDetail />,
      },
      { path: "/community/write/:post?", element: <PostWrite /> },
    ],
  },
]);

export default MainRouter;
