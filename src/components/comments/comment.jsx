import { useEffect } from "react";

export default function Comment(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  const nickname = props.comment.nickname;
  const content = props.comment.content;
  return (
    <>
      <div>
        {nickname} : {content}
      </div>
    </>
  );
}
