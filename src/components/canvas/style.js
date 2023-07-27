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
    display: flex;
    align-items: center;
    margin-top: 15px;
    border: 1px solid black;
    background-color: #eeeeee;
    height: 100px;
    .tools{
      .icons{
        display: flex;
        justify-content: center;
      }
      .slidebar{
        input{
          width: 300px;
        }
      }
    }
    .color{
      display: flex;
      div{
        width: 30px;
        height: 30px;
        margin-left: 10px;
        border-radius: 4px;
      }
      .red{
        background-color: #FF0000;
      }
      .orange{
        background-color: orange;
      }
      .yellow{
        background-color: yellow;
      } 
      .green{
        background-color: green;
      } 
      .skyblue{
        background-color: skyblue;
      }
      .navy{
        background-color: navy;
      }
      .purple{
        background-color: purple;
      }
      .black{
        background-color: black;
      }
      .white{
        background-color: white;
      }
    }
  }
`