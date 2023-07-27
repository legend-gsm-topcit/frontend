import { styled } from "styled-components";

export const comment = styled.div`
  width: 330px;
  margin-top: 30px;
  margin-left: 10px;
  .comment-list {
    height: 600px;
    background-color: #fff;
    border: 1px solid #000;
    padding-left: 10px;
    font-size: 16px;
    padding-right: 10px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column-reverse;
    margin-right: 30px;
  }
  .commentbox {
    margin-top: 20px;
    width: 300px;
    height: 100px;
    background-color: #dbdbdb;
    display: flex;
    flex-direction: column;

    textarea {
      font-family: "Pretendard-Regular";
      resize: none;
      border: none;
      width: 90%;
      height: 60px;
      margin-left: 10px;
      margin-top: 5px;
      text-indent: 1em;
    }
    button {
      font-family: "Pretendard-Regular";
      width: 90%;
      height: 20px;
      margin-left: 12px;
      margin-top: 5px;
      border: none;
      background-color: #000;
      color: #fff;
    }
  }
`;
