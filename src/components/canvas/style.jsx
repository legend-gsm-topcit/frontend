import { styled } from "styled-components";

export const Canvas = styled.div`
  .subject{
    background-color: #eeeeee;
    border: 1px solid black;
    border-bottom: none;
  }
  text-align: center;
  width: 1000px;
  margin-top: 30px;
  canvas {
    border: 1px solid black;
    border-top: none;
    background-color: #eeeeee;
  }

  .div {
    width: 1000px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    border: 1px solid black;
    background-color: #eeeeee;
    height: 100px;
    .tools {
      cursor: pointer;
      .icons {
        display: flex;
        justify-content: space-around;
        div {
          padding: 1px;
          border: 1px solid black;
          border-radius: 3px;
        }
      }
      .slidebar {
        input {
          width: 300px;
        }
      }
    }
    .color {
      display: flex;
      justify-content: space-around;
      div,
      input {
        cursor: pointer;
        width: 50px;
        height: 50px;
        margin-left: 10px;
        border-radius: 4px;
      }
      .red {
        background-color: #ff0000;
      }
      .orange {
        background-color: orange;
      }
      .yellow {
        background-color: yellow;
      }
      .green {
        background-color: green;
      }
      .skyblue {
        background-color: skyblue;
      }
      .navy {
        background-color: navy;
      }
      .purple {
        background-color: purple;
      }
      .black {
        background-color: black;
      }
      .white {
        background-color: white;
      }
    }
  }
`;
