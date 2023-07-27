import { useState } from "react";

export default function Commentbox() {
  const [comments, setComments] = useState();

  const onChange = (e) => {
    setComments(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(comments);
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
