import Commentlist from "./commentslist";
import Commentbox from "./commentbox";
import * as S from "./style";

export default function Commenttab({ StompClient, id, chatlist }) {
  return (
    <S.comment>
      <Commentlist chatlist={chatlist} />
      <Commentbox StompClient={StompClient} id={id} />
    </S.comment>
  );
}
