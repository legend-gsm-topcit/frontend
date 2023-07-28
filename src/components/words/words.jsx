import { useState } from 'react';
import * as S from './style';

export default function Words({ isvisible, setVisible, list, whoDrawing, StompClient, id }) {
  const [word, setWord] = useState(null);
  return <>{isvisible && <S.words>
    {whoDrawing === localStorage.getItem('nickname')
      ? list.map((i, n) => <div key={n} className={`${word === i ? 'active' : 'word'}`} onClick={e => {
        setWord(i);
      }}>
        {i}
      </div>) : `${whoDrawing}님이 단어를 선택중입니다.`}
    <button onClick={e => {
      StompClient.publish({ destination: `/pub/room/${id}/keyword`, body: word });
      // setVisible(false);
    }}>결정</button>
  </S.words>}</>
}