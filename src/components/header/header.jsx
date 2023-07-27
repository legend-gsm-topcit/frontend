import logo from "../../assets/logo.png";
import * as S from "./style";

export default function Header({ whodrawing }) {
  return (
    <S.header>
      <header>
        <img alt="asdf" src={logo}></img>
        {
          whodrawing &&
          <div>{whodrawing} 님이 그리는 중이에요</div>
        }
      </header>
    </S.header>
  );
}
