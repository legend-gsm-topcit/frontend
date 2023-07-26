import { styled } from "styled-components";

export const Canvas = styled.div`
text-align: center;
width: 700px;
margin: auto;
  canvas{
    border: 1px solid black;
    background-color: #eeeeee;
  }
  .div{
    margin-top: 15px;
    border: 1px solid black;
    background-color: #eeeeee;
    height: 100px;
    .color{
      div{
        width: 50px;
        height: 50px;
      }
      .red{
        background-color: #FF0000;
      }
    }
  }
`