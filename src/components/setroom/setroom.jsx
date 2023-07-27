import { useEffect, useState } from 'react';
import * as S from './style';

export default function Setroom({ setPlaying, isHost }) {
  const [rounds, setRounds] = useState(3);
  const [difficulty, setDifficulty] = useState(null);
  const [ready, setReady] = useState(false);
  return <S.setroom>
    <h1>방 설정</h1>
    <div className='flex'>
      <div className='rounds'>
        <h1>라운드 수<br />{rounds}</h1>
        <input readOnly={!isHost} type='range' min={3} max={50} value={rounds} onChange={e => setRounds(e.target.value)} />
      </div>
      <div className='difficulties'>
        <h1>제시어 난이도</h1>
        <div className='innerdif'>
          <div className={difficulty === '상' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('상');
            }
          }}>상</div>
          <div className={difficulty === '중' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('중');
            }
          }}>중</div>
          <div className={difficulty === '하' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('하');
            }
          }}>하</div>
        </div>
      </div>
    </div>
    {isHost ? <button onClick={e => {
      if (difficulty && window.confirm("이대로 진행하시겠습니까?")) {
        setPlaying(true);
      }
    }}>
      게임 시작하기
    </button> : <button onClick={e => {
      setReady(e => !e);
    }}>
      {ready ? '취소하기' : '하기하기'}
    </button>}
  </S.setroom>;
}