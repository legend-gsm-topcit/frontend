import { useState } from "react";

export default function Commentbox({ StompClient, id }) {
  const [comments, setComments] = useState('');

  const onChange = (e) => {
    setComments(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        StompClient.publish({ destination: `/pub/room/${id}/chat/${localStorage?.getItem('nickname')}`, body: comments });
        setComments("");
      }}
      className="commentbox">
      <input
        placeholder="내용을 적어주세요."
        value={comments}
        onChange={onChange}
      />
      <button>등록</button>
    </form>
  );
}
