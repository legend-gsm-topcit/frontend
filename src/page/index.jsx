import "../app.css";
import Header from "../components/header/header";
import PlayerList from "../components/playerlist/playerlist";
import Commenttab from "../components/comments/commenttab";
import Canvas from "../components/canvas/canvas";
import { useEffect, useState } from "react";
import Setnickname from "../components/setNickname/setnickname";
import Setroom from "../components/setroom/setroom";
import { useParams } from "react-router-dom";
import * as StompJs from '@stomp/stompjs';
const Url = '54.180.93.60';

export default function Root() {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [whoDrawing, setWhoDrawing] = useState();
  const [subject, setSubject] = useState([]);
  const [isHost, setHost] = useState(false);
  const [wordList, setWordList] = useState([]);
  //eslint-disable-next-line
  const [nextone, setNextone] = useState();
  const [chatlist, setChatlist] = useState([]);

  let StompClient = new StompJs.Client({
    brokerURL: `ws://${Url}`
  });
  useEffect(e => {
    setIsEntered(localStorage?.getItem('nickname'));
    setHost(localStorage?.getItem('host'));
    console.log(id)
    return () => {
      StompClient.deactivate();
    };
    //eslint-disable-next-line
  }, [id]);
  StompClient.onConnect = e => {
    console.log(e, id);
    StompClient.subscribe(`/sub/room/${id}/memberList`, message => {
      console.log(JSON.parse(message.body));
      setMemberList(JSON.parse(message.body).memberList);
    });
    StompClient.subscribe(`/sub/room/${id}/deadLine`, message => {
      console.log(message);
    });
    StompClient.subscribe(`/sub/room/${id}/start`, message => {
      const m = JSON.parse(message.body);
      console.log(m)
      setWhoDrawing(m.nextDrawer)
      setPlaying(true);
      StompClient.publish({
        destination: `/pub/room/${id}/keywordList`
      });
    });
    StompClient.subscribe(`/sub/room/${id}/keywordList`, message => {
      const m = JSON.parse(message.body);
      setWordList(m);
    });
    StompClient.subscribe(`/sub/room/${id}/chat`, message => {
      const m = (message.body);
      setChatlist(a => [m, ...a]);
    });
    StompClient.subscribe(`/sub/room/${id}/round`, message => {
      console.log(message);
    });
    StompClient.subscribe(`/sub/room/${id}/scoreBoard`, message => {
      console.log(message);
    });
  }
  StompClient.activate();
  return <div className="main-Screen">
    <Header whodrawing={whoDrawing} playing={playing} />
    <PlayerList list={memberList} />
    {playing ? <Canvas whoDrawing={whoDrawing} StompClient={StompClient} setSubject={setSubject} wordList={wordList} subject={subject} id={id} /> : isEntered ? <Setroom setPlaying={setPlaying} StompClient={StompClient} isHost={isHost} id={id} setNextone={setNextone} /> : <Setnickname StompClient={StompClient} setIsEntered={setIsEntered} />}
    <Commenttab StompClient={StompClient} id={id} chatlist={chatlist} />
  </div>
}