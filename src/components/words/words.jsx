import * as S from './style';

export default function Words({ isvisible, setVisible, list, setWord }) {
  return <>{isvisible && <S.words>
    {list.map((i, n) => <div className='word' onClick={e => {

      setVisible(false);
    }}>
      {i}
    </div>)}
  </S.words>}</>
}