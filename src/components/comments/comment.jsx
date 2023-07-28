import { useEffect } from "react";

export default function Comment({ comment }) {
  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <>
      <div>
        {comment}
      </div>
    </>
  );
}
