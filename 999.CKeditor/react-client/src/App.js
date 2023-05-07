import "./css/App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Outlet />
    </div>
  );
};

export default App;
