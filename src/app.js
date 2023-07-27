import "./app.css";
import Header from "./components/header/header";
import PlayerList from "./components/playerlist/playerlist";
import Commenttab from "./components/comments/commenttab";
import Canvas from "./components/canvas/canvas";
import { useEffect, useState } from "react";
import Setnickname from "./components/setNickname/setnickname";
import Setroom from "./components/setroom/setroom";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [whoDrawing, setWhoDrawing] = useState('욱욱');
  const [subject, setSubject] = useState('네모바지 스폰지밥');
  const [isHost, setHost] = useState(false);
  useEffect(e => {
    setHost(true);
  }, []);
  return (
    <>
      <div className="main-Screen">
        <Header whodrawing={whoDrawing} playing={playing} />
        <PlayerList />
        <button onClick={e => setWhoDrawing(e => e + '욱')}>+욱</button>
        <button onClick={e => setWhoDrawing(e => e.substring(1, e.length))}>-욱</button>
        {playing ? <Canvas whoDrawing={whoDrawing} subject={subject} /> : isEntered ? <Setroom setPlaying={setPlaying} isHost={isHost} /> : <Setnickname setIsEntered={setIsEntered} />}
        <Commenttab />
      </div>
    </>
  );
}
