import Comment from "./comment";

export default function commentlist() {
  const comment = {
    nickname: "saf",
    content:
      "worldisyours 이거 진짜 명반인데 좀 들어보세요'klnads'lknadsvlknsdavlknsdavnasdvlnsadlv'nasdlnvsd'anv",
  };
  return (
    <div className="comment-list">
      <Comment comment={comment} />
    </div>
  );
}
