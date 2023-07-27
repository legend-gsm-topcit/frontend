import Comment from "./comment";

export default function commentlist() {
  const comment = {
    nickname: "saf",
    content:
      "dsaflknasdfljasdlfknadsv'klnads'lknadsvlknsdavlknsdavnasdvlnsadlv'nasdlnvsd'anv",
  };
  return (
    <div className="comment-list">
      <Comment comment={comment} />
    </div>
  );
}
