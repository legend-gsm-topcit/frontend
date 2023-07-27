import Commentlist from "./commentslist";
import Commentbox from "./commentbox";
import * as S from "./style";

export default function Commenttab() {
  return (
    <S.comment>
      <Commentlist />
      <Commentbox />
    </S.comment>
  );
}
