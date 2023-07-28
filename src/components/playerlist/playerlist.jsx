import Player from "./player";
import * as S from "./style";

export default function playerlist({ list }) {
  return (
    <S.player>
      <div className="playerlist">
        {list?.map((i, n) => <Player nickname={i.name} points={i.score} />)}
      </div>
    </S.player>
  );
}
