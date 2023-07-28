import Comment from "./comment";

export default function commentlist({ chatlist }) {
  return (
    <div className="comment-list">
      {chatlist.map((i, n) => <Comment comment={i} />)}
    </div>
  );
}
