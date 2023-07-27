import { styled } from "styled-components";

export const player = styled.div`
  margin-left: 30px;
  margin-top: 30px;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    width: 12px;
    background-color: #000;
    background: #a7a7a7;
  }

  .playerlist {
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-color: red;

    div {
      width: 300px;
      height: 70px;
      margin-bottom: 10px;
      background-color: #fff;
      text-align: center;
      line-height: 70px;
      overflow-y: hidden;
    }
  }
`;
