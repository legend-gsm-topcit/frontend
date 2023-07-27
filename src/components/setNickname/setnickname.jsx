import { useState } from 'react';
import * as S from './style';
import { useParams } from 'react-router';

export default function Setnickname({ setIsEntered, StompClient }) {
  const { id } = useParams();
  const [nickname, setNickname] = useState('');
  return <S.setnickname>
    <form onSubmit={e => {
      e.preventDefault();
      if (nickname !== '' && window.confirm(`${nickname}으로 하시겠습니까?`)) {
        localStorage.setItem('nickname', nickname);
        StompClient.publish({ destination: `/pub/room/${id}/join`, body: localStorage?.getItem('nickname') });
        console.log(id)
        setIsEntered(e => {
          //소켓으로 접속
          return true;
        });
      }
    }}>
      <h1>닉네임 <input onChange={e => setNickname(e.target.value)} value={nickname} /></h1>
      <button>입장</button>
    </form>
  </S.setnickname >;
}