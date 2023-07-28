import { useEffect, useState } from 'react';
import * as S from './style';

export default function Setroom({ setPlaying, isHost, StompClient, id, setNextone }) {
  const [rounds, setRounds] = useState(3);
  const [difficulty, setDifficulty] = useState('EASY');
  const [numOfmember, setNumOfmember] = useState(3);
  const [init, setinit] = useState(true);
  useEffect(e => {
    // StompClient.activate();
    if (!init) {
      StompClient.publish({
        destination: `/pub/room/${id}/option/edit/${localStorage.getItem('nickname')}`, body: JSON.stringify({
          "maxMemberCount": numOfmember,
          "maxRoundCount": rounds,
          "level": difficulty
        })
      });
    }
    return () => {
      // StompClient.deactivate();
      setinit(false);
    };
  }, [rounds, difficulty, numOfmember]);
  StompClient.onConnect = e => {
    StompClient.subscribe(`/sub/room/${id}/option`, message => {
      const options = JSON.parse(message.body);
      console.log(options)
      setDifficulty(e => options.level);
      setRounds(e => options.maxRoundCount);
      setNumOfmember(e => options.maxMemberCount);
    });
  }
  // StompClient.activate();
  return <S.setroom>
    <h1>방 설정</h1>
    <div className='flex'>
      <div className='rounds'>
        <h1>라운드 수<br />{rounds}</h1>
        {isHost && <input type='range' min={3} max={50} value={rounds} onChange={e => {
          setRounds(e.target.value);
        }} />}
      </div>
      <div className='member'>
        <h1>최대 인원 수 {numOfmember}</h1>
        {isHost && <>
          <button onClick={e => {
            if (numOfmember < 12) {
              setNumOfmember(e => e + 1);
            }
          }}>+</button>
          <button onClick={e => {
            if (numOfmember > 3) {
              setNumOfmember(e => e - 1);
            }
          }}>-</button>
        </>}
      </div>
      <div className='difficulties'>
        <h1>제시어 난이도</h1>
        <div className='innerdif'>
          <div className={difficulty === 'EASY' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('EASY');
            }
          }}>하</div>
          <div className={difficulty === 'NORMAL' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('NORMAL');
            }
          }}>중</div>
          <div className={difficulty === 'HARD' ? 'active' : ''} onClick={e => {
            if (isHost) {
              setDifficulty('HARD');
            }
          }}>상</div>
        </div>
      </div>
    </div >
    {
      isHost ? <button onClick={e => {
        if (difficulty && window.confirm("이대로 진행하시겠습니까?")) {
          // StompClient.activate();
          StompClient.publish({
            destination: `/pub/room/${id}/start`, body: localStorage.getItem('nickname')
          });
          // StompClient.deactivate();
          setPlaying(true);
        }
      }
      } >
        게임 시작하기
      </button > :
        '방장이 시작하기를 기다리고 있습니다.'
    }
  </S.setroom >;
}