import Player from "./player";
import * as S from "./style";

export default function playerlist() {
  return (
    <S.player>
      <div className="playerlist">
        {
          <>
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
            <Player />
          </>
        }
      </div>
    </S.player>
  );
}
