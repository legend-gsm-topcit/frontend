import "./app.css";
import Header from "./components/header/header";
import PlayerList from "./components/playerlist/playerlist";
import Commenttab from "./components/comments/commenttab";
import Canvas from "./components/canvas/canvas";
import { useState } from "react";
import Setnickname from "./components/setNickname/setnickname";
import Setroom from "./components/setroom/setroom";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [whoDrawing, setWhoDrawing] = useState('욱욱욱');
  return (
    <>
      <div className="main-Screen">
        <Header whodrawing={whoDrawing} />
        <PlayerList />
        {playing ? <Canvas whoDrawing={whoDrawing} subject={'네모바지 스폰지밥'} /> : isEntered ? <Setroom setPlaying={setPlaying} /> : <Setnickname setIsEntered={setIsEntered} />}
        <Commenttab />
      </div>
    </>
  );
}
