import * as StompJs from '@stomp/stompjs';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Root from './page';
import { useEffect } from 'react';
const Url = '54.180.93.60';

export default function App() {
  const { id } = useParams();

  function uuidGenerator() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      //eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  let StompClient = new StompJs.Client({
    brokerURL: `ws://${Url}`
  });

  StompClient.onConnect = e => {
    console.log(e, id);
  }
  useEffect(e => {
    StompClient.activate();

    return () => {
      StompClient.deactivate();
    };
    //eslint-disable-next-line
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<>
            <Root />
          </>} />
          <Route path="/" element={<>
            <form onSubmit={e => {
              e.preventDefault();
              const asdf = uuidGenerator();
              const input = document.querySelector('.create-input').value;
              if (input !== '') {
                localStorage.setItem('nickname', input);
                StompClient.publish({ destination: `/pub/room/${asdf}/create`, body: input });
                localStorage.setItem('host', true)
                console.log(id);
                window.location.href = `/${asdf}`;
              }
            }}><div>
                <input className="create-input" /><br />
                <button className="create-button">
                  게임 생성하기
                </button>
              </div>
            </form>
          </>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
