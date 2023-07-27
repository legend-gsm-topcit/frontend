import { styled } from "styled-components";

export const setroom = styled.div`
  margin-top: 30px;
  background-color: #eeeeee;
  border: 1px solid black;
  width: 1000px;
  text-align: center;
  .flex{
    margin: 100px 0;
    display: flex;
    justify-content: space-around;
    .innerdif{
      display: flex;
      div{
        width: 60px;
        height: 50px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        cursor: pointer;
        & + div{
          margin-left: 20px;
        }
      }
      .active{
        background-color: #ff5c5c;
        color: white;
      }
    }
    input{
      width: 300px;
    }
    button{
      width: 50px;
      height: 50px;
      font-size: 30px;
      &+button{
        margin-left: 20px;
      }
    }
  }
  button{
    width: 200px;
  }
`