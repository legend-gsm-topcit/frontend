import "./app.css";
import Header from "./components/header/header";
import PlayerList from "./components/playerlist/playerlist";
import Commenttab from "./components/comments/commenttab";

export default function App() {
  return (
    <>
      <div className="main-Screen">
        <Header />
        <PlayerList />
        <Commenttab />
      </div>
    </>
  );
}
