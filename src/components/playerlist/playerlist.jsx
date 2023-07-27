import Player from "./player";
import * as S from "./style";

export default function playerlist() {
  return (
    <S.player>
      <div className="playerlist">
        {
          <>
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
            <Player nickname={'새마갤'} points={10} />
          </>
        }
      </div>
    </S.player>
  );
}
