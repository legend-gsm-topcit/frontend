import Commentlist from "./commentslist";
import Commentbox from "./commentbox";
import * as S from "./style";

export default function Commenttab({ StompClient, id }) {
  return (
    <S.comment>
      <Commentlist />
      <Commentbox StompClient={StompClient} id={id} />
    </S.comment>
  );
}
